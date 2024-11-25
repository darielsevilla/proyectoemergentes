import Button from 'react-bootstrap/Button';
import { CircularProgressBar } from "react-percentage-bar";
import Card from 'react-bootstrap/Card';
import ResultsCard from './resultscard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import VocabCard from './vocabcard';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'


interface CourseInfo{
    courseID : string,
    unitNum: number,
    _id : string,
    name : string
}



export default function UnitInfo({courseID, unitNum, name, _id}:CourseInfo){
    const [loaded, setLoaded] = useState(false);
    interface vocab{
        word: string,
        definition : string,
        image : string,
    }
    const [vocabWords, setVocabWords] = useState<vocab[]>([]);
    const [current, setCurrent] = useState(0);

    
    const loadInfo = async () =>{
        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
            }
        }
        const body={
            _id: _id
        }
        let url = "http://localhost:3001/getUnitInfo";
   
        const response = await axios.post(url, body, config);
        console.log(response.data.vocabList)
        const newVocab = response.data.vocabList.map((vocab : any)=>({
            word : vocab.word,
            definition : vocab.definition,
            image : vocab.image
        }))
        setVocabWords(newVocab)
        setCurrent(0)
        console.log(vocabWords.at(current)?.word )
        setLoaded(true)
    }
    useEffect(()=>{
        loadInfo()
    },[unitNum, name])
    const change = () =>{
        if(current+1 >= vocabWords.length){
            setCurrent(0);
        }else{
            setCurrent(current+1)
        }
    }
    if(!loaded){
        return(<><div className="container flexVertical loginWindow ">
            <Spinner animation="border" className="whitetxt margint"/>
            </div></>)
    }
    //const currentCourse = courses.find((course) => course.id === courseID)
    return(
        
        <>
            <ResultsCard courseID={courseID}></ResultsCard>
            <h1 className="margin-5pc whitetxt"><b>Unidad #{unitNum}</b></h1>
            <h1 className="whitetxt"><b>{name}</b></h1>

            {/*Vocab Cards */}
            <div onClick={change} className='cardClickeable'>
                <VocabCard word = {vocabWords.at(current)?.word ?? "" } definition={vocabWords.at(current)?.definition ?? ""} img={vocabWords.at(current)?.image ?? ""}></VocabCard>
            </div>
            {/* bottom cards */}
            <Row xs={1} md={2} className="g-4 margin-5pc">
      
                <Col>
                <Card className='bottomCardUnit whitetxt'>
                    <Card.Body>
                    <Card.Title >Conocimientos Necesarios</Card.Title>
                    <Card.Text>
                     
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col>
                <Card className='bottomCardUnit whitetxt'>
                    <Card.Body>
                    <Card.Title >Ejemplos Practicos</Card.Title>
                    <Card.Text>
                      
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
        
            </Row>

        </>

    );
}