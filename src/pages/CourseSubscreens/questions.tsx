import { Alert, Button, Form } from "react-bootstrap";
//import {questions} from "@/data/data";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'

interface questionObj{
    question : string;
    option1 : string;
    option2 : string;
    option3 : string;
    option4 : string;
    rightAnswer : number;
}
export default function Questions(){

    const [racha, setRacha] = useState(0);
    const [monitor, setMonitor] = useState(0);
    const [question, setQuestion] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [maxima, setMaxima] = useState(0);
    const [answered, setAnswered] = useState<boolean[]>([false, false, false]);
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [questions, setQuestions] = useState<questionObj[]>([]); 
    //array of numbers
    const [array, setArray] = useState<number[]>([0, 1, 2]); 

    
    //generate questions
    const generateQuestionsarr = async () =>{
        setLoad(false);
        setLoad2(false);
        let url = "http://localhost:3001/getPreguntasGeneradas";
        const item = localStorage.getItem("currentCourseName")
        const list = localStorage.getItem("currentUnits")
        const response = await axios.get(url,{
            params: {
                questions : JSON.stringify(questions),
                courseName : item ? item : "",
                units : list
            }
        })

        setAnswered([...answered,...[false,false,false,false,false]])
        await setQuestions([...questions,...JSON.parse(response.data.list)]);
        await new Promise((resolve) => setTimeout(resolve, 0));

        setLoad(true);
    }
    useEffect(()=>{
        setLoad2(true);
    }, [questions]);
    useEffect(()=>{
        setQuestions([]);
        generateQuestionsarr();
    }, []);
    //question tab
    const forward = () =>{
        if(question < questions.length){
            setQuestion(question+1)
            setCorrect(0);
        }
    }
    
    const answer = () =>{
        if(monitor === questions.at(question)?.rightAnswer && !answered[question]){
            setRacha(racha+1)
            setCorrect(1);
            setAnswered((prev) => {
                const newAnswered = [...prev];
                newAnswered[question - 1] = true;
                return newAnswered;
            });
        }else if(!answered[question]){
            if(racha > maxima){
                setMaxima(racha);
            }
            setRacha(0);
            setCorrect(-1);
        }
    }

    //switch selected answer methods 
    const setMonitor1 = () =>{
        setMonitor(1);
        
    }
    const setMonitor2 = () =>{
        setMonitor(2);
    }
    const setMonitor3 = () =>{
        setMonitor(3);
    }
    const setMonitor4 = () =>{
        setMonitor(4);
    }
   
    const warning = () =>{
        if(correct == 0){
            return(<></>);
        }else if(correct == 1){
            return(<>
            <Alert className="margin-5pc" variant={ 'success'}>
          Respuesta Correcta!
        </Alert>
            </>);
        }else if(correct == -1){
            return(<>
            <Alert className="margin-5pc" variant={ 'danger'}>
          Respuesta InCorrecta!
        </Alert>
            </>);
        }
    }
    const generarMas =() =>{   
        generateQuestionsarr();
 
    }
    const questionsTab = () => {
        if(!load2){
            return(<></>);
        }
        if(question>=0 && question<questions.length){
            return(<>
                <div className="quiz_container">
                <h2>Pregunta:</h2>
                <p>{questions.at(question)?.question}</p>
                <hr/>
                <Form className="margin-5pc">
                    <Form.Check
                        name="group1"
                        type={'radio'}
                        label={questions.at(question)?.option1}
                        id={`op1`}
                        onChange={setMonitor1}
                    />
                    <Form.Check
                        name="group1"
                        type={'radio'}
                        label={questions.at(question)?.option2}
                        id={`op2`}
                        onChange={setMonitor2}
                    />
                    <Form.Check
                        name="group1"
                        type={'radio'}
                        label={questions.at(question)?.option3}
                        id={`op3`}
                        onChange={setMonitor3}
                    />
                    <Form.Check
                        name="group1"
                        type={'radio'}
                        label={questions.at(question)?.option4}
                        id={`op4`}
                        onChange={setMonitor4}
                    />
                    <div className="flex margin-5pc question_button">
                        <Button variant="warning" onClick={answer}>Responder</Button>
                        <Button variant="secondary" onClick={forward}>Siguiente</Button>
                    </div>
                    {warning()}
                </Form>
            </div>
            </>);
        } else if(question == questions.length){
            // No hay mas preguntas
            return (<div className="no_more_questions">
                <h4>No hay mas preguntas.</h4>
                <h4>Desea generar mas preguntas?</h4>
                <div>
                    <Button variant="warning" onClick={generarMas}>Generar</Button>
                </div>
            </div>); 
        }
    }


    
    return(<div className="container height-100 whitetxt">
        <div className="quiz">
            <h1><b>Preguntas</b></h1>
            <p>Racha máxima: <span id="max-streak">{maxima}</span><br/>Racha actual: <span id="current-streak">{racha}</span></p>
        </div>
        {load? questionsTab() :<><div className="container flexVertical loginWindow ">
            <Spinner animation="border" className="whitetxt margint"/>
            </div></> }
    </div>);
}