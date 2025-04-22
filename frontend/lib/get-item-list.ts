/// <reference lib="dom" />

import { api } from "./api.ts";

export interface ShopItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export async function getItemList() {
    const items: ShopItem[] = [];
    const ids = await api("shop-items/list", "GET");

    for (const id of ids) {
        items.push(await api(`shop-items/${id}`, "GET"));
    }

    return items;
}
