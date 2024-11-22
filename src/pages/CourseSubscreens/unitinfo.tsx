import Button from 'react-bootstrap/Button';
import { CircularProgressBar } from "react-percentage-bar";
import Card from 'react-bootstrap/Card';
import {variables} from '@/data/data';
import ResultsCard from './resultscard';



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
            <h1></h1>
        </>

    );
}