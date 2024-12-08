import Link from "next/link";
import {variables} from '@/data/data';
import { use, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

export default function CreatedCourses(){
    const [load, setLoad] = useState(0);

    const [textField, setTextField] = useState<string>("");

    const handleClick = (id : string, name : string) =>{
        localStorage.setItem("currentCourse", id);
        localStorage.setItem("currentCourseName", name);
        console.log(id);
        console.log(name);
    }


    const cards = () => {
        if(load != 0){
        const listItem = localStorage.getItem("courses");
        let list = listItem ? JSON.parse(listItem) : []
        if(textField != ""){
            list = list.filter((item : any)=>{
                return item.name.toLowerCase().includes(textField.toLowerCase());
            })
        }
        return(<>
            {list.map((course: any)=>
            <Link href="/AcademicChief/viewcourse" key={course.id}>
                <div className="card mb-3" onClick={()=>{handleClick(course.id, course.name)}}>
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={course.img} className="img-fluid rounded-start"  style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                        <p className="card-text">creado por {course.creator}</p>
                            <h5 className="card-title">{course.name}</h5>
                            {/*atributos */}
                            <div className='flex contAtt'>
                                <img src="/iconosCurso/clock_icon.png" width={15} height={15}></img>
                                <p className='fontSizeCourse'>{course.timeCreated}</p>
                            </div>
        
                            <div className='flex contAtt'>
                                <img src="/iconosCurso/units_icon.png" width={15} height={15}></img>
                                <p className='fontSizeCourse'>{course.units} unidades</p>
                            </div>
            
                        </div>
                        </div>
                    </div>
                </div>
                </Link>
                )}
                    
            </>);
        }
        return(<></>)
    }

    useEffect(()=>{
        setLoad(1);
    },[])
    

    return(<>
        <div className='container'>
            <div className="flex">
                <div className="input-group flex-nowrap barMargin barWidth">
                <input type="text" className="form-control" placeholder="Busca un curso" aria-label="Username" aria-describedby="addon-wrapping" value={textField} onChange={(e)=>{setTextField(e.target.value)}}/>

                </div>
                <Link href="/AcademicChief/createcourse" className="linkWidth"><Button variant="primary" className = "btnHeight barMargin buttonCreate">Crear curso +</Button></Link>
            </div>
            {cards()}
        </div>
    </>);
}
