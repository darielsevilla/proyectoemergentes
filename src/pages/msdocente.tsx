import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState, useEffect } from 'react';
import Footerc from './footer';
import Link from "next/link"
import {variables, courseInfo} from "@/data/data"
import Perfil from './perfil';

export default function PantallaCurso(){
    interface course{
        id: string;
        img : string;
        creator : string;
        name : string;
        timeCreated : string;
        units : number;
        people : number;
    }

    const [list, setList] = useState<course[]>([])
    useEffect(()=>{
       const item = localStorage.getItem('courses')
        const list2 = item ? JSON.parse(item) : [];
        setList(list2)
    },[])
    const handleClick = (id : string, name : string) =>{
        localStorage.setItem("currentCourse", id);
        localStorage.setItem("currentCourseName", name);
    }
    const cards = () => {
       
        return(<>
        {list.map((course : any)=>
        
        <Link onClick={() => handleClick(course.id, course.name)} href="/cursowindow" key={course.id}>
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
                            <img src="./iconosCurso/clock_icon.png" width={15} height={15}></img>
                            <p className='fontSizeCourse'>{course.timeCreated}</p>
                        </div>
    
                        <div className='flex contAtt'>
                            <img src="./iconosCurso/units_icon.png" width={15} height={15}></img>
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
    const cursos = () =>{
        return(<>
            <div className='container'>
                <div className="input-group flex-nowrap barMargin">
                <input type="text" className="form-control" placeholder="Busca un curso" aria-label="Username" aria-describedby="addon-wrapping" />
                <button className="input-group-text" id="addon-wrapping"><img width="20px" height="20px" src = "./imagenes/search.png"></img></button>
                </div>
                
                {cards()}
            </div>
        </>);
    }

    {/*menu control */}
    const [menu, setMenu] = useState(2);
    const onClick1 = () =>{
        setMenu(1)
    }
    const onClick2 = () =>{
        setMenu(2);
    }
    
    const onClick3 = () =>{
        setMenu(3)
    }
    const onClick4 = () =>{
        setMenu(4)
    }
    const onClick5 = () =>{
        setMenu(5)
    }
    const menuChoice = () =>{
        if(menu == 1){
            return (<Perfil></Perfil>);
        }else if(menu == 2){
            return cursos();
        }else{
            return <></>
        }
    }
    return(
        <>  
        <div className='flex'>
            <Sidebar className='autoheight lightbg min-height-100'>
                <div className='topTag'>
                    <img width= '50px' height='50px' src = "./imagenes/icono.png"></img>
                    <p>SmartLearn</p>
                </div>
                <Menu>
                    <MenuItem onClick={onClick1} icon = {<img width= '24px' height='24px' src = "./imagenes/perfil_icon.png"></img>}>
                        Mi Perfil
                    </MenuItem>
                    <MenuItem onClick={onClick2} icon = {<img width= '24px' height='24px' src = "./imagenes/curso_icon.png"></img>}>
                        Cursos
                    </MenuItem>
                    <MenuItem onClick={onClick3} icon = {<img width= '24px' height='24px' src = "./imagenes/resources_icon.png"></img>}>
                        Mis Recursos
                    </MenuItem>
                    <MenuItem onClick={onClick4} icon = {<img width= '24px' height='24px' src = "./imagenes/more_icon.png"></img>}>
                        Mas Recursos
                    </MenuItem>
                    <MenuItem onClick={onClick5} icon = {<img width= '24px' height='24px' src = "./imagenes/chat_icon.png"></img>}>
                        Chat
                    </MenuItem>
                    
                </Menu>
            </Sidebar>

            {menuChoice()} 
       
        </div>   
        <Footerc></Footerc>        
        </>
    );
}