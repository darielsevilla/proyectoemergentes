import { summaries } from "@/data/data"
import {useState, useEffect} from "react"
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
const testCase = () =>{
    return(
        <>
        <div className="titleSummaries margin-5pc"><h4><b>Unidad 1</b></h4></div>
        <div className="summaries"><p>Unidad 1</p></div></>
    );
}
export function SummaryWindow(){
    const [listSum, setListSum] = useState([]);
    const [load, setLoad] = useState(0);
    const [load2, setLoad2] = useState(0);
    let url = "http://localhost:3001/getSummaries";
    const item = localStorage.getItem("currentCourse")
    const loadSummaries = async () =>{
        try{
            let url = "http://localhost:3001/getSummaries";
        const response = await axios.get(url, {
                params: {
                    course_id : item ? item : ""
                }
            })

            const list = response.data.resultado ? response.data.resultado : [];
            setListSum(list)
            
        }catch(error){
            
        }
        setLoad2(1);
        
    }
    useEffect(()=>{
        loadSummaries();
    },[])
    if(load2 == 0){
        return(<><div className="container flexVertical loginWindow ">
            <Spinner animation="border" className="whitetxt margint"/>
            </div></>)
    }
    return(<>
    <div className="container whitetxt">
        <h1><b>Resumenes</b></h1>
        {(listSum).map((summary : any)=><div key={summary.unit_num}><div className="titleSummaries margin-5pc"><h4><b>Unidad {summary.unit_num}</b></h4></div>
        <div className="summaries"><p>{summary.summary}</p></div></div>)}  
    </div></>);
}