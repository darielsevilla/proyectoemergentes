import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
interface data{
    word : string,
    definition: string,
    img: string
}
export default function VocabCard(){
    return(
        <Card className="text-center bottomCardUnit whitetxt cardClass">
      
      <Card.Body>
        <Card.Title><h1><b>Special title treatment</b></h1></Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
     
        <img src="/imagenesCurso/data_structures_cover.jpg" width="30%" className='imgCard'></img>
        
        
      </Card.Body>
      

    </Card>
    );
}