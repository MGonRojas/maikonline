/// <reference lib="dom" />

// TO-DO add item to database

import { getItemList, ShopItem } from "../lib/get-item-list.ts";
import { useState } from "react";
import { api } from "../lib/api.ts";

let initialItems = await getItemList();

export default function Shop() {
    const [items, setItems] = useState<ShopItem[]>(initialItems);
    const [id, setId] = useState(NaN);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(NaN);
    const [imageUrl, setImageUrl] = useState("");

    return (
        <>
            <button
                type="button"
                className="rounded-button"
                onClick={async () => {
                    setItems(initialItems = await getItemList());
                }}
            >
                Recargar
            </button>
            {items.sort((itemA, itemB) => itemA.price - itemB.price).map(
                (item) => {
                    return (
                        <div className="container-item" key={item.id}>
                            <img
                                className="item-image"
                                src={item.imageUrl}
                                alt={item.name}
                            />
                            <h1 className="item-name">{item.name}</h1>
                            <h2 className="item-price">${item.price}</h2>
                            <p className="item-description">
                                <i>"{item.description}"</i>
                            </p>
                            <p className="item-description">
                                Identificador: <strong>{item.id}</strong>
                            </p>
                            <button
                                type="button"
                                className="rounded-button"
                                onClick={async () => {
                                    await api(
                                        `shop-items/${item.id}`,
                                        "DELETE",
                                    );
                                    setItems(
                                        initialItems = await getItemList(),
                                    );
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    );
                },
            )}

            <br />

            <div className="container-item">
                <h1 className="item-name">Añade un producto a la tienda</h1>

                <textarea
                    placeholder="Identificador"
                    onChange={(e) => setId(Number(e.target.value))}
                >
                    {isNaN(id) ? "" : id}
                </textarea>

                <textarea
                    placeholder="Nombre"
                    onChange={(e) => setName(e.target.value)}
                >
                    {name}
                </textarea>

                <textarea
                    placeholder="Descripción"
                    onChange={(e) => setDescription(e.target.value)}
                >
                    {description}
                </textarea>

                <textarea
                    placeholder="Precio"
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                >
                    {isNaN(price) ? "" : price}
                </textarea>

                <textarea
                    placeholder="Enlace a foto"
                    onChange={(e) => setImageUrl(e.target.value)}
                >
                    {imageUrl}
                </textarea>
            </div>

            <button
                type="button"
                className="rounded-button"
                onClick={async () => {
                    if (
                        isNaN(id) || !Number.isSafeInteger(id) ||
                        isNaN(price) || price === Infinity ||
                        price === -Infinity || !name || !description ||
                        !imageUrl
                    ) {
                        alert(
                            "Por favor, llena todos los campos correctamente.",
                        );
                        return;
                    }

                    await api(`shop-items/${id}`, "POST", {
                        id,
                        name,
                        description,
                        price,
                        imageUrl,
                    });

                    setItems(initialItems = await getItemList());
                }}
            >
                Añadir producto a la base de datos
            </button>
        </>
    );
}
