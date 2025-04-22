import { fsp, path, ts } from "../deps.js";
import { isFile } from "./is-file.js";

export async function transpile(filepath, filemap = new Map()) {
    filepath = path.resolve(filepath);

    if (filemap.has(filepath)) {
        return filemap;
    }

    if (!(await isFile(filepath))) {
        console.error(
            `\x1b[91mError: \x1b[0mFile not found: \x1b[33m${filepath}\x1b[0m`,
        );
        return filemap;
    }

    const contents = await fsp.readFile(filepath, "utf-8");
    let transpiled = transpileModule(contents, filepath);

    if (!transpiled) {
        return filemap;
    }

    transpiled = `import React from "react";\n${transpiled}`;
    filemap.set(filepath, transpiled);

    const imports = resolveImports(transpiled, filepath);

    for (const importPath of imports) {
        await transpile(importPath, filemap);
    }

    return filemap;
}

function resolveImports(code, filepath) {
    const imports = [];
    const basepath = path.dirname(filepath);
    const ext = path.extname(filepath)?.toLowerCase() || ".js";

    const sourceFile = ts.createSourceFile(
        filepath,
        code,
        ts.ScriptTarget.ESNext,
        true,
        ext === ".tsx" ? ts.ScriptKind.TSX : (
            ext === ".ts" ? ts.ScriptKind.TS : (
                ext === ".jsx" ? ts.ScriptKind.JSX : ts.ScriptKind.JS
            )
        ),
    );

    for (const statement of sourceFile.statements) {
        if (
            !ts.isImportDeclaration(statement) ||
            !statement.moduleSpecifier.text
        ) {
            continue;
        }

        const importPath = statement.moduleSpecifier.text;

        if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
            continue;
        }

        imports.push(
            path.resolve(
                path.join(basepath, importPath),
            ),
        );
    }

    return imports;
}

function transpileModule(code, filepath) {
    const result = ts.transpileModule(code, {
        compilerOptions: {
            jsx: ts.JsxEmit.React,
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
        },
        fileName: filepath,
        reportDiagnostics: true,
    });

    if (!result.diagnostics?.length) {
        return result.outputText || "// Empty";
    }

    const formattedErrors = ts.formatDiagnosticsWithColorAndContext(
        result.diagnostics,
        {
            getCurrentDirectory: () => path.dirname(filepath),
            getCanonicalFileName: (fileName) => fileName,
            getNewLine: () => "\n",
        },
    );

    console.error(
        `\n\x1b[91mError: \x1b[0mTranspilation failed in \x1b[33m${filepath}\x1b[0m:\x1b[0m\n${formattedErrors}\n`,
    );
    return false;
}
