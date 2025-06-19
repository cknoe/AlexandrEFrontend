import "../css/card.css"
import LogoReact from "../assets/logoreact.svg"

type CardProps = {
    cardExist: boolean;
    cardTitle? : string;
    cardText? : string;
}

export default function Card({cardExist, cardTitle = "Create New Card", cardText = "Click here to create a new Card"}: CardProps) {
    return (
        <div className="card" onClick={(event) => handleClick(event, cardTitle, cardExist)}>
            <h2>{ cardTitle }</h2>
            <p>{ cardText }</p>
            {cardExist && (
                <img src={LogoReact} alt="Logo React" width={200} height={200} />
            )}
        </div>
    );
}

function handleClick(event: React.MouseEvent<HTMLDivElement>, cardText:string, cardExist:boolean) {
    (cardExist) ? alert("carte sélectionnée : " + cardText) : alert("Hello");
    console.log(event);
}