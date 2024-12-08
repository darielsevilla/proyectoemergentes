import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
//import {questions} from "@/data/data";
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
export default function Exams(){

    const initialMinutes = 10;
    interface pregunta{
        question: string;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        rightAnswer: number;
    } 
    const [questions, setQuestions] = useState<pregunta[]>([])
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [loading, setLoading] = useState(false);
    const [enter, setEnter] = useState(false);
    const load =async () =>{
        setLoading(true)
        const id = localStorage.getItem("currentCourse");
        const headers = {
            params: {
                course_id: id
            }
        }
        try{
            const responseExams = await axios.get("http://localhost:3001/getExamQuestions", headers)
            const examArray = responseExams.data.resultado;
            
            const questionsArray = examArray.map((question : any)=>({
                question: question.question,
                option1: question.optionA, 
                option2: question.optionB, 
                option3: question.optionC, 
                option4: question.optionD,
                rightAnswer: Number(question.answer)
            }))

            setQuestions(questionsArray);
        }catch(error){
         
        }
        setLoading(false)
    }
    useEffect(() => {
        if (timeLeft <= 0) return; 

        const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        
        return () => clearInterval(interval); 
    }, [timeLeft]);

    useEffect(()=>{
        load();
    },[])
    const [showEvaluation, setShowEvaluation] = useState(true);

    const handleButtonClick = () => {
        setShowEvaluation(false);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`; 
    };

    const [score, setScore] = useState(0);
    const [monitor, setMonitor] = useState(0);
    const [question, setQuestion] = useState(1);
    const [correct, setCorrect] = useState(0);
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
        if(question < questions.length+1){
            setQuestion(question+1)
            setCorrect(0);
        }
    }
    
    const answer = () =>{
        forward();
        console.log(monitor);
        console.log(questions.at(question-1)?.rightAnswer)
        if(monitor === questions.at(question-1)?.rightAnswer && !answered[question-1]){
            console.log("correcto");
            setScore(score+1);
            setCorrect(1);
            setAnswered((prev) => {
                const newAnswered = [...prev];
                newAnswered[question - 1] = true;
                return newAnswered;
            });
        }else if(!answered[question-1]){
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

    const end = async () =>{
        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
            }
        }
        
        const userId = localStorage.getItem("userId")
            const id = localStorage.getItem("currentCourse");
        const getReq = localStorage.getItem("currentCompletionReq")
            const getCom = localStorage.getItem("currentCompletion")
            const requirement = getReq ? Number(getReq) : 0
            const completion = getCom ? Number(getCom) : 0
            const trueScore = (score / questions.length) * 100
            const body={
                user_id : userId,
                course_id: id,
                completion: trueScore
            }    
            if(trueScore > completion && completion >= requirement){
                //score mas alto pero curso ya completado  
                try{   
                    localStorage.setItem("currentCompletion", String(trueScore))
                    const response = await axios.post("http://localhost:3001/updateScoreCompleted", body, config);
                }catch(error){
                    
                }
            }else if(trueScore > completion && completion< requirement && trueScore < requirement){
                //score mas alto pero no paso
                try{       
                    localStorage.setItem("currentCompletion", String(trueScore))        
                    const response = await axios.post("http://localhost:3001/updateCompletion", body, config);
                }catch(error){

                }
            }else if(trueScore > completion && completion< requirement && trueScore >= requirement){
                //score mas alto y paso
                try{               
                    localStorage.setItem("currentCompletion", String(trueScore))
                    const response = await axios.post("http://localhost:3001/completeCourse", body, config);
                    const item = localStorage.getItem("courses");
                    const array = JSON.parse(item?item:"[]");
                    const arrayf = array.filter((item : any)=>item.id != id);
                    localStorage.setItem("courses", JSON.stringify(arrayf));
                }catch(error){

                }
            }
    }
    const questionsTab = (questionParam : number) => {
        if(question>0 && question<4){
            return(<>
                <div className="quiz_container">
                    <div className="quiz_header">
                        <h2>Pregunta:</h2>
                        <h4>Tiempo restante: {formatTime(timeLeft)}</h4>
                    </div>
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
                        {/* {warning()} */}
                    </Form>
                </div>
            </>);
        } else if(question == 4){
            if(!enter){
                end();
                setEnter(true);
            }
            
            const userId = localStorage.getItem("userId")
            const id = localStorage.getItem("currentCourse");
            
            // No hay mas preguntas
            const getReq = localStorage.getItem("currentCompletionReq")
            const getCom = localStorage.getItem("currentCompletion")
            const requirement = getReq ? Number(getReq) : 0
            const completion = getCom ? Number(getCom) : 0
            const trueScore = (score / questions.length) * 100
          

            return (<div className="no_more_questions">
                <h4>Examen Finalizado</h4>
                <h4>Su puntuación fue de: {score} / {questions.length}</h4>
                <br></br>
                {(trueScore > completion) ? <h4>¡Nuevo puntaje más alto!</h4> : <></>}
                <br></br>
                {(trueScore >= requirement && completion < requirement) ? <h4>¡Felicidades! Has pasado el curso con {trueScore}</h4> : <></>}
            </div>); 
        }
    }


    if(loading){
        return(<><div className="container flexVertical loginWindow ">
            <Spinner animation="border" className="whitetxt margint"/>
            </div></>)
    }
    return (
        <div className="container height-100 whitetxt">
          {showEvaluation ? (
            <div className="evaluacion">
                <h1><b>Evaluación - @Curso</b></h1>
                <h5>Este examen contiene {questions.length} preguntas</h5>
                <h5>No podra regresar las preguntas</h5>
                <h5>Usted dispone de 10 minutos</h5>
                <br/>
                <Button variant="warning" onClick={handleButtonClick}>Comenzar Evaluación</Button>
            </div>
          ) : (
            <div className="">
                {questionsTab(array[question-1])}
            </div>
          )}
        </div>
      );
    }
    