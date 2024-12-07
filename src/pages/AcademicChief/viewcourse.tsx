import {useState, useEffect} from 'react'
import axios from 'axios'
import { courseInfo } from '@/data/data'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

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
        name : string,
        userName: string,
        lastName : string,
        completion: number
    }


    const [curso, setCurso] = useState<courses>()
    const [unidades, setUnidades] = useState<units[]>()
    const [users, setUsers] = useState<user[]>()
    
    const [selected, setSelected] = useState(-1);

    const load = async () =>{
        const id = localStorage.getItem("currentCourse");
        const currentCourseName = localStorage.getItem("currentCourseName")
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
                course_id: id
            }
        }
        const responseUsers = await axios.get("http://localhost:3001/getCourseStudents", headers)

        const users = responseUsers.data.resultado;
        
       
        const usersList = users.map((user : any)=>({
            name: user.name,
            lastName: user.lastName,
            userName: user.userName,
            completion: Number(user.completion)
        }))


        setUsers(usersList);
    }
    const select = (index : number) =>{
        console.log(index);
        setSelected(index);
    }

    useEffect(()=>{
        load()
    }, [])

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

            <h4 className="whitetxt titleCreate"><b>Preguntas de Examen</b></h4>
            <Table striped bordered hover variant="dark" className='margin-5pc'>
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
                {users?.map((user, i)=><tbody key = {i} onClick = {()=>{select(i)}}
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
                    
            <Button variant="secondary">Asignar a Docente</Button>

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
                {users?.map((user)=><tbody>
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