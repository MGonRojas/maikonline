/// <reference lib="dom" />

import { useState } from "react";

import About from "./components/about.tsx";
import Home from "./components/home.tsx";
import Shop from "./components/shop.tsx";

enum Section {
    Home,
    About,
    Shop,
}

export default function App() {
    const [section, setSection] = useState(Section.Home);

    return (
        <>
            <button type="button" onClick={() => setSection(Section.Home)}>
                Principal
            </button>

            <button type="button" onClick={() => setSection(Section.About)}>
                Acerca de
            </button>

            <button type="button" onClick={() => setSection(Section.Shop)}>
                Tienda
            </button>

            <div className="container-page">
                {section === Section.Home
                    ? <Home />
                    : section === Section.About
                    ? <About />
                    : section === Section.Shop
                    ? <Shop />
                    : <p>Sección no encontrada</p>}
            </div>
        </>
    );
}
