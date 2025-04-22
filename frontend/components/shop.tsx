/// <reference lib="dom" />

// TO-DO add item to database

import { api } from "../lib/api.ts";

const shop: {
    items: Array<{
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    }>;
} = await api("shop-items");

export default function Shop() {
    api("shop-items").then((newShop) => {
        shop.items = newShop.items;
    });

    return (
        <>
            {shop.items.map((item) => {
                return (
                    <div className="container-item" key={item.id}>
                        <img className="item-image" src={item.imageUrl} alt={item.name} />
                        <h2 className="item-name">{item.name}</h2>
                        <h3 className="item-price">${item.price.toFixed(2)}</h3>
                        <p className="item-description">{item.description}</p>
                    </div>
                );
            })}
        </>
    );
}
