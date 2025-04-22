import { fs, path } from "../../deps.js";

export default function shopItems(id, data, req, _res) {
    // We use sync operations to not read/write the file multiple times
    // at the same time.
    const database = path.resolve("./backend/api/shop-items.json");
    const json = JSON.parse(fs.readFileSync(database, "utf-8"));

    const isList = id === "list";
    id = parseInt(id);

    if (!isList && !Number.isSafeInteger(id)) {
        return { status: 400, body: { error: "Invalid ID" } };
    }

    let index = json.items.findIndex((item) => item.id === id);

    switch (req.method) {
        case "GET": {
            if (isList) {
                return { status: 200, body: json.items.map((item) => item.id) };
            }

            if (index === -1) {
                return { status: 404, body: { error: "Item not found" } };
            }

            return { status: 200, body: json.items[index] };
        }

        case "DELETE": {
            if (index === -1) {
                return { status: 404, body: { error: "Item not found" } };
            }

            json.items.splice(index, 1);
            fs.writeFileSync(database, JSON.stringify(json, null, 4), "utf-8");

            return { status: 200, body: { message: "Item deleted" } };
        }

        case "POST": {
            if (index === -1) {
                index = json.items.length;
            }

            if (
                typeof data.name !== "string" ||
                typeof data.description !== "string" ||
                typeof data.price !== "number" ||
                typeof data.imageUrl !== "string"
            ) {
                return { status: 400, body: { error: "Invalid data" } };
            }

            json.items.splice(index, 1, {
                id: id,
                name: data.name,
                description: data.description,
                price: data.price,
                imageUrl: data.imageUrl,
            });

            fs.writeFileSync(database, JSON.stringify(json, null, 4), "utf-8");
            return { status: 200, body: json.items[index] };
        }

        default: {
            return { status: 405, body: { error: "Method not allowed" } };
        }
    }
}
