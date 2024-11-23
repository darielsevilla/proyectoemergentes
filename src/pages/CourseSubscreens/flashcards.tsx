import Card from 'react-bootstrap/Card';
import { useState } from 'react';
interface vocab{
    word: string;
    definition: string;
}
const testCard =() =>{
    return(
        <Card style={{ width: '18rem' }} className="flashCard flexVertical">
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card> 
    );
}

const wordSide =(word: string) =>{
    return(<Card.Title><b>{word}</b></Card.Title>)
}

const definitionSide = (definition: string) =>{
    return(<Card.Title>{definition}</Card.Title>)
}
export default function FlashCards({word, definition}:vocab) {

    const [change, setChange] = useState(1);

    const changeCourse = () =>{
        if(change == 1){
            setChange(2);
        }else{
            setChange(1);
        }
    };
  return (
    
    <Card className="flashCard justified-text">
      <Card.Body onClick={changeCourse} className='flexVertical loginWindow'>
        {change == 1 ? wordSide(word):definitionSide(definition)}
      </Card.Body>
    </Card>
    
  );
}
