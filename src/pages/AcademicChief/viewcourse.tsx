import {useState, useEffect} from 'react'
import axios from 'axios'
import { courseInfo, questions } from '@/data/data'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


export default function ViewCourse(){
    
    interface courses{
        id: string, 
        img: string,
        creator: string,
        description: string,
        name: string,
        timeCreated: string, 
        units: number,
        completionRequirement: number,
        institutionID: string,
    }
    interface units{
        id: string,
        name: string,
        number: number
    }

    interface user{
        id : string,
        name : string,
        userName: string,
        lastName : string,
        completion: number
    }

    interface question{
        question: string,
        options: string[],
        answer: number,
    }
    const [loading, setLoading] = useState(false);

    const [curso, setCurso] = useState<courses>()
    const [unidades, setUnidades] = useState<units[]>()
    const [users, setUsers] = useState<user[]>()
    const [notAssignedUsers, setNotAssignedUsers] = useState<user[]>()
    const [usersCompleted, setUsersCompleted] = useState<user[]>();
    const [questionsExam, setQuestionsExam] = useState<question[]>()

    const [selected, setSelected] = useState(-1);
    const [selectedUnassigned, setSelectedUnassigned] = useState(-1);
    const load = async () =>{
        setLoading(true);
        const id = localStorage.getItem("currentCourse");
        const currentCourseName = localStorage.getItem("currentCourseName")
        const institution = localStorage.getItem('institutionID')

        const cursos = localStorage.getItem("courses")
        const list = JSON.parse(cursos ? cursos : "")
        const course = list.find((item: any) => item.id === id);
        
        await setCurso({
            id: course.id, 
            img: course.image,
            creator: course.creator,
            description: course.description,
            name: course.name,
            timeCreated: course.timeCreated, 
            units: course.units,
            completionRequirement: course.completionRequirement,
            institutionID: course.institutionID
        })

        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
            }
        }

        const body ={
            courseId: course.id
        }
        const response = await axios.post("http://localhost:3001/getUnits",body,config);
        
        const unidadess = response.data.units;
        console.log("Received units:", unidadess);

        const units = unidadess.map((unidad: any) => ({
            id: unidad._id,
            name: unidad.name,
            number: unidad.number,
        }));

        setUnidades(units)
        
        const headers = {
            params: {
                course_id: id,
                institutionID: institution
            }
        }
        try{
            const responseUsers = await axios.get("http://localhost:3001/getCourseStudents", headers)

            const users = responseUsers.data.resultado;
        
            const usersList = users.map((user : any)=>({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                userName: user.userName,
                completion: Number(user.completion)
            }))

            setUsers(usersList);
        }catch(error){

        }

        try{
        
            const responseUsers2 = await axios.get("http://localhost:3001/getNotCourseStudents", headers)
            const users2 = responseUsers2.data.resultado;
        
            const usersList2 = users2.map((user : any)=>({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                userName: user.userName,
                completion: Number(user.completion)
            }))

            setNotAssignedUsers(usersList2);
        }catch(error){
         
        }

        try{
            const responseUsers3 = await axios.get("http://localhost:3001/getCourseCompletedStudents", headers)
            const users3 = responseUsers3.data.resultado;
        
            const usersList3 = users3.map((user : any)=>({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                userName: user.userName,
                completion: Number(user.completion)
            }))
            console.log(usersList3);
            setUsersCompleted(usersList3);
        }catch(error){
         
        }
        
        try{
            const responseExams = await axios.get("http://localhost:3001/getExamQuestions", headers)
            const examArray = responseExams.data.resultado;
            
            const questionsArray = examArray.map((question : any)=>({
                question: question.question,
                options: [question.optionA, question.optionB, question.optionC, question.optionD],
                answer: question.answer
            }))

            setQuestionsExam(questionsArray);
        }catch(error){
         
        }

        
        setLoading(false);
    }
    const select = (index : number) =>{
        console.log(index);
        setSelected(index);
    }

    useEffect(()=>{
        load()
        
    }, [])

    if(loading){
        return(<><div className="container flexVertical loginWindow ">
            <Spinner animation="border" className="whitetxt margint"/>
            </div></>)
        ;
    }
    
    const assign = async () =>{
        try{
            if(selected != -1){
                const config = {
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin' : '*'
                    }
                }
                const user = notAssignedUsers?.at(selected);
                const body = {
                    user_id: user?.id,
                    course_id: curso?.id,
                    completion:0, 
                }

                const response = await axios.post("http://localhost:3001/assignCourse", body, config)
                console.log(response);
                if(response.data.message = "Curso asignado con exito!"){
                    if(notAssignedUsers){
                        const updatedUsers = [...notAssignedUsers];
                        updatedUsers.splice(selected, 1);
                        setNotAssignedUsers(updatedUsers)
                    }
                    if(users && user){
                        setUsers([...users, user])
                    }
                }
                setSelected(-1);
            }
        }catch(error){

        }
    }
    const remove = async () =>{
        if(selectedUnassigned != -1){
      
                const config = {
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin' : '*'
                    }
                }
                const user = users?.at(selectedUnassigned);
                console.log(user)
                const body = {
                    user_id: user?.id,
    
                }

                const response = await axios.post("http://localhost:3001/unassignCourse", body, config)
                console.log(response);
                if(response.data.message = "Curso asignado con exito!"){
                    if(users){
                        const updatedUsers = [...users];
                        updatedUsers.splice(selectedUnassigned, 1);
                        setUsers(updatedUsers)
                    }
                    if(notAssignedUsers && user){
                        setNotAssignedUsers([...notAssignedUsers, user])
                    }
                }
            setSelectedUnassigned(-1);
        }
    }

    return( <div className="container">
        <div className="containerCreate">
            <h1 className="whitetxt titleCreate"><b>{curso?.name ? curso.name : ""}</b></h1>
            <hr className="whitetxt"></hr>
            <h4 className="whitetxt titleCreate"><b>{curso?.description}</b></h4>
            <div className='flex whitetxt margin-5pc'>
                <h4>Creador :</h4>
                <h4>{curso?.creator}</h4>
           </div>
           <div className='flex whitetxt margin-5pc'>
                <h4>ID Institucion :</h4>
                <h4>{curso?.institutionID}</h4>
           </div>
           <div className='flex whitetxt margin-5pc'>
                <h4>Requerimiento de completación: </h4>
                <h4>{curso?.completionRequirement}%</h4>
           </div>
           <hr className="whitetxt"></hr>
           <h4 className="whitetxt titleCreate"><b>Unidades</b></h4>
           <div className='flex whitetxt margin-5pc'>
                <h4>Unidades: </h4>
                <h4>{curso?.units}</h4>
           </div>

           <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>number</th>
                    </tr>
                </thead>
                {unidades?.map((unidad)=><tbody>
                    <tr>
                    <td>{unidad.id}</td>
                    <td>{unidad.name}</td>
                    <td>{unidad.number}</td>
                    </tr>
                </tbody>)}
            </Table>

            <hr className="whitetxt"></hr>

            <h4 className="whitetxt titleCreate"><b>Preguntas de Examen:</b></h4>
            <Table striped bordered hover variant="dark" className='margin-5pc'>
                <thead>
                    <tr>
                    <th>pregunta</th>
                    <th>respuesta</th>
                    </tr>
                </thead>
                {questionsExam?.map((question)=><tbody>
                    <tr>
                    <td>{question.question}</td>
                    <td>{question.options.at(question.answer-1)}</td>
 
                    </tr>
                </tbody>)}
            </Table>

            <hr className="whitetxt"></hr>
            <h4 className="whitetxt titleCreate"><b>Asignar Curso</b></h4>
            <div className='flex whitetxt margin-5pc'>
                <h4>Asignar docente:</h4>
           </div>
            <Table striped bordered hover variant="dark" className='margin-5pc'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>userName</th>  
                        <th>lastName</th>
                    </tr>
                </thead>
                {notAssignedUsers?.map((user, i)=><tbody key = {i} onClick = {()=>{select(i)}}
                     style={{
                        backgroundColor: selected == i ? '#66b2ff' : 'inherit',
                        cursor: 'pointer',
                    }}>
                    <tr>
                    <td>{user.name}</td>
                    <td>{user.userName}</td>
                    <td>{user.lastName}</td>
                    </tr>
                </tbody>)}
            </Table>
            
            <Button variant="secondary" onClick={()=>{assign()}}>Asignar Docente</Button>

            <div className='flex whitetxt margin-5pc'>
                <h4>Docentes asignados al curso:</h4>
           </div>
            <Table striped bordered hover variant="dark" className='margin-5pc'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>userName</th>  
                        <th>lastName</th>
                    </tr>
                </thead>
                {users?.map((user, i)=><tbody
                    onClick = {()=>{setSelectedUnassigned(i)}}
                    style={{
                    backgroundColor: selectedUnassigned == i ? '#66b2ff' : 'inherit',
                    cursor: 'pointer'}}>
                    <tr>
                    <td>{user.name}</td>
                    <td>{user.userName}</td>
                    <td>{user.lastName}</td>
                    </tr>
                </tbody>)}
            </Table>
            
            <Button variant="secondary" onClick={()=>{remove()}}>Remover Docente</Button>

            <hr className="whitetxt"></hr>
            <div className='flex whitetxt margin-5pc'>
                <h4>Docentes Que han completado el curso:</h4>
           </div>
            <Table striped bordered hover variant="dark" className='margin-5pc'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>userName</th>  
                        <th>lastName</th>
                    </tr>
                </thead>
                {usersCompleted?.map((user, i)=><tbody
                    onClick = {()=>{setSelectedUnassigned(i)}}
                    style={{
                    backgroundColor: selectedUnassigned == i ? '#66b2ff' : 'inherit',
                    cursor: 'pointer'}}>
                    <tr>
                    <td>{user.name}</td>
                    <td>{user.userName}</td>
                    <td>{user.lastName}</td>
                    </tr>
                </tbody>)}
            </Table>    

        </div>
        
    </div>)
}