import Card from "./Card";

const cardTitles: string[] = ["a","b","c","d","e","a"];

export default function CardsList() {
    return(<>
                { cardTitles.map( (cardTitle, index) => 
                <Card key={cardTitle + index} cardExist={true} cardTitle={cardTitle} cardText="HelloWorld"/>)
                }
                <Card cardExist={false}/>
            </>
    )
}