import LogoReact from "../img/logoreact.svg"

export default function Card() {

    var cardTitle:string = "Bienvenue !";
    var cardText:string = "Ceci est une carte centrée.";
    return (
        <div className="card">
            <h2>{ cardTitle }</h2>
            <p>{ cardText }</p>
            <img src={LogoReact} alt="Logo React" width={200} height={200} />
        </div>
    );
}
