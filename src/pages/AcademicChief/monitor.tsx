import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export default function Monitor(){
    interface Teacher{
        course: string;
        username: string;
        name: string;
        lastName: string;
        completion: number;
    }

    interface course{
        id: string, 
        img: string,
        creator: string,
        description: string,
        name: string,
        timeCreated: string, 
        units: number,
        completionRequirement: number,
        institutionID: string
    }
    const [items, setItems] = useState<course[]>([]);
    const[teachers, setTeachers] = useState<Teacher[]>([
        {
            course: '673fc457d9432de1a1077674',
            username: 'jorge24f',
            name: 'Jorge',
            lastName: 'Lopez',
            completion: 80,

        },
        {
            course: '673fc457d9432de1a1077674',
            username: 'jorge24f',
            name: 'Jorge',
            lastName: 'Diaz',
            completion: 80,

        },
        {
            course: '673fc48dd9432de1a1077675',
            username: 'alexlopez',
            name: 'Alex',
            lastName: 'Lopez',
            completion: 40,

        }
    ]);


    const tablas = (courseid : string) =>{
        const itemList = teachers.filter((item)=>item.course == courseid)
        return(
            <>
            <Table striped variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nombre de Usuario</th>
                    <th>% obtenido en evaluación</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList.map((person, i )=><tr key = {person.username}>
                            <td>{i+1}</td>
                            <td>{person.name}</td>
                            <td>{person.lastName}</td>
                            <td>{person.username}</td>
                            <td>{person.completion}%</td>
                    </tr>)}   
                </tbody>
            </Table>

            </>
        );
    }

    useEffect(()=>{
        const item = localStorage.getItem('courses')
        const item2 = item ? JSON.parse(item) : [];   
        setItems(item2)
    },[])

  

    return(<>
        <div className='whitetxt'>
            <h1><b>Monitoreo</b></h1>
            
            {items.map((item)=>
                <>
                    <h2 className='margin-5pc'>{item.name}</h2>
                    <hr></hr>
                    {tablas(item.id)}
                </>)}
        </div>
    </>);
}