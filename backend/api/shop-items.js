import { fs, path } from "../../deps.js";

export default function shopItems(data) {
    // We use sync operations to not read/write the file multiple times
    // at the same time.
    const database = path.resolve("./backend/api/shop-items.json");
    const json = JSON.parse(fs.readFileSync(database, "utf-8"));

    if (!data) {
        return json;
    }

    if (data === null || typeof data !== "object") {
        return { error: "Invalid data" };
    }

    switch (data.action) {
        case "set": {
            if (
                typeof data.id !== "number" ||
                typeof data.name !== "string" ||
                typeof data.description !== "string" ||
                typeof data.price !== "number" ||
                typeof data.imageUrl !== "string"
            ) {
                return { error: "Invalid data" };
            }

            const index = json.items.findIndex((item) => item.id === data.id);

            if (index > -1) {
                json.items.splice(index, 1);
            }

            json.items.push({
                id: data.id,
                name: data.name,
                description: data.description,
                price: data.price,
                imageUrl: data.imageUrl,
            });

            break;
        }

        case "del": {
            if (typeof data.id !== "number") {
                return { error: "Invalid data" };
            }

            const index = json.items.findIndex((item) => item.id === data.id);

            if (index > -1) {
                json.items.splice(index, 1);
            } else {
                return { error: "Item not found" };
            }

            break;
        }

        default:
            return { error: "Invalid data" };
    }

    fs.writeFileSync(database, JSON.stringify(json, null, 4), "utf-8");
    return { success: true };
}
