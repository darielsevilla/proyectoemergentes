import Button from 'react-bootstrap/Button';
import { CircularProgressBar } from "react-percentage-bar";
import Card from 'react-bootstrap/Card';
import {variables} from '@/data/data';
import ResultsCard from './resultscard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import VocabCard from './vocabcard';


interface CourseInfo{
    courseID : number,
    unitID: number
}

interface Unit{
    
}

export default function UnitInfo({courseID, unitID}:CourseInfo){


    //const currentCourse = courses.find((course) => course.id === courseID)
    return(
        
        <>
            <ResultsCard courseID={courseID}></ResultsCard>
            <h1 className="margin-5pc whitetxt"><b>Unidad #1</b></h1>
            <h1 className="whitetxt"><b>Introducción</b></h1>

            {/*Vocab Cards */}
            <VocabCard></VocabCard>

            {/* bottom cards */}
            <Row xs={1} md={2} className="g-4 margin-5pc">
      
                <Col>
                <Card className='bottomCardUnit whitetxt'>
                    <Card.Body>
                    <Card.Title >Conocimientos Necesarios</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col>
                <Card className='bottomCardUnit whitetxt'>
                    <Card.Body>
                    <Card.Title >Ejemplos Practicos</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
        
            </Row>

        </>

    );
}