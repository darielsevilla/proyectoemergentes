import Link from "next/link";
import {variables} from '@/data/data';
import { use, useEffect, useState } from "react";

export default function CreatedCourses(){
    const [load, setLoad] = useState(0);
    const cards = () => {
        if(load != 0){
        const listItem = localStorage.getItem("courses");
        const list = listItem ? JSON.parse(listItem) : []
        return(<>
            {list.map((course: any)=>
            <Link href="@/src/pages/cursowindow" key={course.id}>
                <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={course.img} className="img-fluid rounded-start" alt="..." />
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
            <div className="input-group flex-nowrap barMargin">
            <input type="text" className="form-control" placeholder="Busca un curso" aria-label="Username" aria-describedby="addon-wrapping" />
            <button className="input-group-text" id="addon-wrapping"><img width="20px" height="20px" src = "/imagenes/search.png"></img></button>
            </div>
            
            {cards()}
        </div>
    </>);
}
