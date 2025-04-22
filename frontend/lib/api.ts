/// <reference lib="dom" />

export async function api(
    route: string,
    method: "GET" | "POST" | "DELETE",
    body: unknown = null,
) {
    try {
        const res = await fetch(`/api/${route}`, {
            method: method,
            body: body === null ? undefined : JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}
