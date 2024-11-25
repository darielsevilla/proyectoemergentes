import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
interface data{
    word : string,
    definition: string,
    img: string
}
export default function VocabCard({word, definition, img}:data){
    return(
        <Card key ={word} className="text-center bottomCardUnit whitetxt cardClass cardClickeable">
      
      <Card.Body>
        <Card.Title><h1><b>{word}</b></h1></Card.Title>
        <Card.Text>
          {definition}
        </Card.Text>
     
        <img src={img} width="30%" className='imgCard'></img>
        
        
      </Card.Body>
      

    </Card>
    );
}