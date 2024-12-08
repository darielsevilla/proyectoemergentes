import Card from 'react-bootstrap/Card';
import {variables} from '@/data/data';
import { CircularProgressBar } from "react-percentage-bar";
import { useState, useEffect } from 'react'
import axios from 'axios';
interface CourseInfo{
    courseID : string
}



export default function ResultsCard({courseID}:CourseInfo){
    const [name, setName] = useState("")
    const [completionReq, setCompletionReq] = useState("");
    const [completionUsr, setCompletionUsr] = useState("");
    useEffect(()=>{
        const cu = localStorage.getItem("currentCompletion");
        setCompletionUsr(cu ? cu : "");
        const cr = localStorage.getItem("currentCompletionReq");
        setCompletionReq(cr ? cr : "");
        const nm = localStorage.getItem("currentCourseName");
        setName(nm ? nm : "");
    },[])
    return(
    <>
    <div className="container">
        
        <Card className='lightbg'>
            <Card.Header className = 'flex loginWindow'><h1>{name}</h1></Card.Header>
            <Card.Body className='flex'>

                <CircularProgressBar
                size={"2rem"}
                radius={"10rem"}
                roundLineCap={false}
                styles="separators"
            
                percentage={parseInt(completionUsr,10)}
                />
                <div className=' height-100 loginWindow flexVertical colorResults'>
                    <Card.Title><h2>Resultados de ultima evaluacion: {parseInt(completionUsr,10)}%</h2></Card.Title>
                    <Card.Title><h2>Requerimiento de aprobacion: {completionReq}%</h2></Card.Title>
                </div>
            </Card.Body>
        </Card>


    </div>
    </>
    );
}