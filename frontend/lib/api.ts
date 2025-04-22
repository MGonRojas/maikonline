/// <reference lib="dom" />

export async function api(name: string, body: unknown = null) {
    try {
        const res = await fetch(`/api/${name}`, {
            method: body === null ? "POST" : "GET",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await res.json();
    } catch {
        return null;
    }
}
