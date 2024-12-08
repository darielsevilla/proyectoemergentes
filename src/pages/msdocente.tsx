import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState, useEffect } from 'react';
import Footerc from './footer';
import Link from "next/link"
import {variables, courseInfo} from "@/data/data"
import Perfil from './perfil';
import axios from "axios";

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
    const [textField, setTextField] = useState<string>("");
    useEffect(()=>{
       const item = localStorage.getItem('courses')
        const list2 = item ? JSON.parse(item) : [];
        setList(list2)
    },[])
    const handleClick = async (id : string, name : string) =>{
        localStorage.setItem("currentCourse", id);
        localStorage.setItem("currentCourseName", name);
        const userId = localStorage.getItem("userId");
        try{
            let url = "http://localhost:3001/getCourseProgress";
            const headers = {
                params:{
                    user_id: userId? userId : "",
                    course_id: id
                }
            }
            const response = await axios.get(url,headers);
            if(response){
                const progress = response.data.resultado;
                localStorage.setItem("currentCompletion",progress);
            }

        ;
            const cursos = localStorage.getItem("courses");
            const courseList = cursos? JSON.parse(cursos) : []
            const course = courseList.find((curso : any)=>curso.id == id);
            console.log(String(course.completionRequirement));
            localStorage.setItem("currentCompletionReq", String(course.completionRequirement))
        }catch(error){
            console.log("algo salio mal")
            console.log(error)
        }
    
    }
    const cards = () => {
        let list2 = list;
        if(textField != ""){
            list2 = list.filter((item : any)=>{
                return item.name.toLowerCase().includes(textField.toLowerCase());
            })
        }
        return(<>
        {list2.map((course : any)=>
        
        <Link onClick={() => handleClick(course.id, course.name)} href="/cursowindow" key={course.id}>
            <div className="card mb-3" >
            <div className="row g-0">
                <div className="col-md-4">
                <img src={course.img} className="img-fluid rounded-start" style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="..." />
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
                <input type="text" className="form-control" placeholder="Busca un curso" aria-label="Username" aria-describedby="addon-wrapping" value={textField} onChange={(e)=>{setTextField(e.target.value)}} />
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
            <Sidebar className='height-100 lightbg min-height-100'>
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
                    
                    
                </Menu>
            </Sidebar>

            {menuChoice()} 
       
        </div>   
        <Footerc></Footerc>        
        </>
    );
}