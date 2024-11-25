import FlashCard from "./flashcards";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import {flashcards} from "@/data/data";
import {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'



export default function FlashCardScreen(){
    interface Flashcard{
        word: string;
        definition: string;
    }
    const [flashcardList, setFlashcardList] = useState<Flashcard[]>([]);
    const [loaded, setLoaded] = useState(false);
    const loadInfo = async () =>{
        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
            }
        }
        const item = localStorage.getItem("currentCourse")
        
        const body={
            courseId: item ? item : ""
        }
        let url = "http://localhost:3001/getFlashcards";
   
        const response = await axios.post(url, body, config);
  
        const newList = response.data.flashcards.map((vocab : any)=>({
            word : vocab.word,
            definition : vocab.definition,
        }))
        setFlashcardList(newList)
        setLoaded(true)       
    }

    function FlashCardCarousel() {
        return (
          <Carousel className="margin-5pc" fade>
            {flashcardList?.map((flashcard)=><Carousel.Item key={flashcard.word} className="loginWindow flex" >
                <FlashCard word={flashcard.word} definition={flashcard.definition}></FlashCard>
            </Carousel.Item>)}
            
            
          </Carousel>
        );
    }
    //useStates for the vocab game
    const [completion, setCompletion] = useState(0);
    const [monitor, setMonitor] = useState(0);
    const [question, setQuestion] = useState(1);
    const [correct, setCorrect] = useState(0);
    const [answered, setAnswered] = useState<boolean[]>([false, false, false, false]);
    //array of numbers
    const [array, setArray] = useState<number[]>([0, 1, 2, 3]); 

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
           if(question < 5){
            setQuestion(question+1)
            setCorrect(0);
           }
    
    }

    const backward = () =>{
        if(question >= 0){
            setQuestion(question-1)
            setCorrect(0);
        }
    }


    const answer = () =>{
        if(monitor === flashcards.questions.at(question-1)?.rightAnswer && !answered[question-1]){
            setCorrect(1);
          
            setCompletion(25+completion);
            console.log(completion);


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
    const questionsTab = (questionParam : number) => {
        
        if(question > 0 && question < 5){
            return(<>
                <Card className='fc-questions whitetxt margin-5pc'>
                    {/*flashcard de arriba */}
                        <Card className="flashCard justified-text">
                    <Card.Body className='flexVertical loginWindow'>
                        <Card.Title>{flashcards.questions.at(questionParam)?.definition}</Card.Title>
                    </Card.Body>
                    </Card>
    
                    {/*opciones y boton */}
                    <Form className="margin-5pc">
                        <Form.Check
                            name="group1"
                            type={'radio'}
                            label={flashcards.questions.at(questionParam)?.option1}
                            id={`op1`}
                            onChange={setMonitor1}
                        />
                        <Form.Check
                            name="group1"
                            type={'radio'}
                            label={flashcards.questions.at(questionParam)?.option2}
                            id={`op2`}
                            onChange={setMonitor2}
                        />
                        <Form.Check
                            name="group1"
                            type={'radio'}
                            label={flashcards.questions.at(questionParam)?.option3}
                            id={`op3`}
                            onChange={setMonitor3}
                        />
                        <Form.Check
                            name="group1"
                            type={'radio'}
                            label={flashcards.questions.at(questionParam)?.option4}
                            id={`op4`}
                            onChange={setMonitor4}
                        />

                        <div className="flex margin-5pc">
                         <Button onClick={backward} variant="secondary">Retroceder</Button>
                         <Button onClick={answer} variant="primary">Responder</Button>
                         <Button variant="secondary" onClick={forward}>Siguiente</Button>
                        </div>
                        {warning()}
                    </Form>
                </Card>
            </>);
        }else if(question == 5){
            //carta de juego terminado aqui
            return(<>
            {/* */}
            </>);
    
        }else{
            //carta de iniciar juego aqui
            return(<></>);
        }
    }

    
    const CompletionBar=()=> {

        return( 
      
            <div className="progress margin-5pc" role="progressbar" aria-label="Warning example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                    <div className="bg-warning" style={{width: `${completion}%`, textAlign:'center', transition: 'width 0.5s ease-in-out', color:"white"}}>{completion}%</div>
                </div>
        )
              
    }
    useEffect(()=>{
        setArray((prevArray) => shuffleArray(prevArray));
        loadInfo();
    },[])

    if(!loaded){
        return(<><div className="container flexVertical loginWindow ">
            <Spinner animation="border" className="whitetxt margint"/>
            </div></>)
    }
    return(<div className="container height-100 whitetxt">

        <h1><b>Flash Cards</b></h1>
        <FlashCardCarousel></FlashCardCarousel>
        <h1 className="margin-5pc"><b>Empezar Juego</b></h1>
        
        
        <div className="fc-questions-cont">
        {CompletionBar()}
        {questionsTab(array[question-1])}
            
        </div>
       
    </div>);
}