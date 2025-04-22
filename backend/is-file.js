import { fsp } from "../deps.js";

export async function isFile(filePath) {
    try {
        const stats = await fsp.stat(filePath);
        return stats.isFile();
    } catch {
        return false;
    }
}
