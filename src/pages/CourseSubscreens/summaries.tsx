import { summaries } from "@/data/data"
const testCase = () =>{
    return(
        <>
        <div className="titleSummaries margin-5pc"><h4><b>Unidad 1</b></h4></div>
        <div className="summaries"><p>Unidad 1</p></div></>
    );
}
export function SummaryWindow(){
    return(<>
    <div className="container whitetxt">
        <h1><b>Resumenes</b></h1>
        {(summaries.summaries).map((summary)=><div key={summary.unitNum}><div className="titleSummaries margin-5pc"><h4><b>Unidad {summary.unitNum}</b></h4></div>
        <div className="summaries"><p>{summary.summary}</p></div></div>)}  
    </div></>);
}