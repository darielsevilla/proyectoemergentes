import Card from 'react-bootstrap/Card';
import {variables} from '@/data/data';
import { CircularProgressBar } from "react-percentage-bar";

interface CourseInfo{
    courseID : number
}


export default function ResultsCard({courseID}:CourseInfo){
    return(
    <>
    <div className="container">
        
        <Card className='lightbg'>
            <Card.Header className = 'flex loginWindow'><h1>Curso:Progracion 1</h1></Card.Header>
            <Card.Body className='flex'>

                <CircularProgressBar
                size={"2rem"}
                radius={"10rem"}
                roundLineCap={false}
                styles="separators"
            
                percentage={60}
                />
                <div className=' height-100 loginWindow flexVertical colorResults'>
                    <Card.Title><h2>Resultados de ultima evaluacion: 40%</h2></Card.Title>
                    <Card.Title><h2>Requerimiento de aprobacion: 80%</h2></Card.Title>
                </div>
                
            </Card.Body>
        </Card>
    </div>
    </>
    );
}