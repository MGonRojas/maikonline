/// <reference lib="dom" />

// TO-DO

export default function About() {
    return (
        <>
            <div className="container-item">
                <h1 className="item-name">
                    ¿Quienes estan detras de MaikOnline ✨?
                </h1>
            </div>

            <div className="container-item">
                <img
                    className="profile-picture"
                    src="/assets/pictures/michael-gonzalez.png"
                />
                <h2 className="item-name">
                    <a href="https://github.com/MGonRojas/">Michael González</a>
                </h2>{" "}
                <p className="item-description">
                    <i>
                        Estudiante. Cooperó con el desarrollo de esta aplicación
                        web como parte de su tarea al participar activamente
                        durante el proceso tanto de diseño como de
                        investigación.
                    </i>
                </p>
            </div>

            <div className="container-item">
                <img
                    className="profile-picture"
                    src="/assets/pictures/jabonchan.png"
                />
                <h2 className="item-name">
                    <a href="http://github.com/jabonchan/">jabonchan</a>
                </h2>
                <p className="item-description">
                    <i>
                        Programador con experiencia. Tutor de Michael González
                        durante la confección de esta aplicación web.
                        Proporcionó ayuda, guía y orientación en el desarrollo
                        del proyecto.
                    </i>
                </p>
            </div>
        </>
    );
}
