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
                    src="/assets/pictures/jabonchan.png"
                />
                <h2 className="item-name">
                    <a href="http://github.com/jabonchan/">jabonchan</a>
                </h2>
            </div>
            <div className="container-item">
                <img
                    className="profile-picture"
                    src="/assets/pictures/michael-gonzalez.png"
                />
                <h2 className="item-name">
                    <a href="https://github.com/MGonRojas/">Michael González</a>
                </h2>
            </div>
        </>
    );
}
