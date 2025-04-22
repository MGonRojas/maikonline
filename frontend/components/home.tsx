/// <reference lib="dom" />

export default function Home() {
    return (
        <>
            <div className="container-item">
                <h1 className="item-name">MaikOnline ✨</h1>
            </div>

            <br />

            <div className="container-item">
                <p className="item-description">
                    Este es un sitio web desarrollado como una aplicación de una
                    sola página <strong>(SPA)</strong> utilizando{" "}
                    <strong>React</strong> y{" "}
                    <strong>TypeScript</strong>. Incluye una demostración de el
                    uso de una <strong>API RESTful</strong>{" "}
                    la cual interactua con el backend para modificar y manejar
                    los productos disponibles en la tienda y sus detalles.

                    <br />
                    <br />

                    <strong>🌠 Pruebalo ya en el apartado de "Tienda".</strong>
                    <br />
                    <strong>
                        <a href="https://github.com/MGonRojas/maikonline">
                            ✍️ Revisa el codigo en GitHub
                        </a>
                    </strong>
                </p>
            </div>

            <br />

            <div className="container-item">
                <p className="item-description">
                    Utilizando las tecnologias de:
                </p>
                <br />
                <img
                    className="item-image"
                    src="https://arielfuggini.com/static/d00325bbd9f153f8a3bfb2a3d4cd87e3/32ccb/react.png"
                />
                <img
                    className="item-image"
                    src="https://andrewbeeken.co.uk/wp-content/uploads/2018/11/nodejs.jpg?w=1200"
                />
                <img
                    className="item-image"
                    src="https://miro.medium.com/v2/resize:fit:1024/1*ud0sEpluCXzmf9Jr7x37UA.png"
                />
            </div>
        </>
    );
}
