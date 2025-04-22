/// <reference lib="dom" />

import { api } from "../lib/api.ts";

const shop = { items: [] };

// TO-DO

export default function Shop() {
    api("shop-items").then((newShop) => {
        shop.items = newShop;
    });

    return (
        <>
            {(() => {
                // TEST ONLY
                const items = [];
                return <p />;
            })()}
        </>
    );
}
