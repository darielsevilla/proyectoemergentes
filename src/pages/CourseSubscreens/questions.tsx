import { Alert, Button, Form } from "react-bootstrap";
import {questions} from "@/data/data";
import { useEffect, useState } from "react";

export default function Questions(){

    const [racha, setRacha] = useState(0);
    const [monitor, setMonitor] = useState(0);
    const [question, setQuestion] = useState(1);
    const [correct, setCorrect] = useState(0);
    const [maxima, setMaxima] = useState(0);
    const [answered, setAnswered] = useState<boolean[]>([false, false, false]);

    //array of numbers
    const [array, setArray] = useState<number[]>([0, 1, 2]); 

    const shuffleArray = (arr: number[]): number[] => { 
        const newArr = [...arr]; 
        for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    //question tab
    const forward = () =>{
        if(question < 4){
            setQuestion(question+1)
            setCorrect(0);
        }
    }
    
    const answer = () =>{
        if(monitor === questions.at(question-1)?.rightAnswer && !answered[question-1]){
            setRacha(racha+1)
            setCorrect(1);
            setAnswered((prev) => {
                const newAnswered = [...prev];
                newAnswered[question - 1] = true;
                return newAnswered;
            });
        }else if(!answered[question-1]){
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

    const questionsTab = (questionParam : number) => {
        if(question>0 && question<4){
            return(<>
                <div className="quiz_container">
                <h2>Pregunta:</h2>
                <p>{questions.at(questionParam)?.question}</p>
                <hr/>
                <Form className="margin-5pc">
                    <Form.Check
                        name="group1"
                        type={'radio'}
                        label={questions.at(questionParam)?.option1}
                        id={`op1`}
                        onChange={setMonitor1}
                    />
                    <Form.Check
                        name="group1"
                        type={'radio'}
                        label={questions.at(questionParam)?.option2}
                        id={`op2`}
                        onChange={setMonitor2}
                    />
                    <Form.Check
                        name="group1"
                        type={'radio'}
                        label={questions.at(questionParam)?.option3}
                        id={`op3`}
                        onChange={setMonitor3}
                    />
                    <Form.Check
                        name="group1"
                        type={'radio'}
                        label={questions.at(questionParam)?.option4}
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
        } else if(question == 4){
            // No hay mas preguntas
            return (<div className="no_more_questions">
                <h4>No hay mas preguntas.</h4>
                <h4>Desea generar mas preguntas?</h4>
                <div>
                    <Button variant="warning">Generar</Button>
                </div>
            </div>); 
        }
    }

    useEffect(()=>{
        setArray((prevArray) => shuffleArray(prevArray));
    },[])

    return(<div className="container height-100 whitetxt">
        <div className="quiz">
            <h1><b>Preguntas</b></h1>
            <p>Racha máxima: <span id="max-streak">{maxima}</span><br/>Racha actual: <span id="current-streak">{racha}</span></p>
        </div>
        {questionsTab(array[question-1])}
    </div>);
}