import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from 'react';
import Footerc from './footer';
import Link from "next/link"
import {variables} from "@/data/data"


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

    const [list,setList] = useState<course[]>([
        {
            id: "eed143",
            img: "./imagenesCurso/data_structures_cover.jpg",
            creator : "Reynod Bocanegra",
            name : "Estructura de datos 1",
            timeCreated: "2 years",
            units: 5,
            people: 4
        }   
    ]);
    const cards = () => {
        return(<>
        {variables.courses.map((course)=>
        
        <Link href="/cursowindow" key={course.id}>
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

    //mi perfil
    interface curso{
        id: string;
        name : string;
        completion: number;
    }
    const [coursesInProgress,setCoursesInProgress] = useState<curso[]>([
        {
            id: "eed143",
            name : "Estructura de datos 1",
            completion: 75
        }   
    ]);

    const [cursoReciente, setCursoReciente] = useState<curso>({
        id: "NaN",
        name: "Ningun curso terminado",
        completion: 0
    })

    const perfil = () =>{
        return(<>
                <div className='container'>
                {/*left side */}
                <div className="card mb-3">
  <div className="row g-0 ">
    <div className="col-md-4">
    <div className='horizontalCenter'>
   
      <img src="./imagenesCurso/data_structures_cover.jpg" className="img-fluid heightPfCard  rounded-circle mt-4" alt="..." />
      
      <h3 className="card-title">@{localStorage.getItem('userName')}</h3>
      <h4 className="card-title">{localStorage.getItem('name')} {localStorage.getItem('lastName')}</h4>
      <a href="#" className="btn btn-primary form-control buttonLogin cardWidth"><b>Editar Perfil</b></a> 
      </div>
    </div>
    {/*right side*/}
    <div className="col-md-8">
      <div className="card-body">
        <h3 className="card-title"><b>Cursos Activos</b></h3>
        <div className='cardSpace'>
        {/*beginning of card */} 
        {coursesInProgress.map((curso)=><div key = {curso.id}>
                <div className="card cardMargin">
                
                <div className="card-body">
                <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                <h5 className="card-title">{curso.name}</h5>
                <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-warning text-dark" style={{width: `${curso.completion}%`}}>{curso.completion}%</div>
                </div>
                </div>
                
            </div>
        </div>)}
        
        

        {/*end of card */}
        
        </div>
        {/* curso terminado */}
        <h3 className="card-title"><b>Cursos Terminado Más Reciente</b></h3>
        <div className="card cardMargin">
                
                <div className="card-body">
                <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                <h5 className="card-title">{cursoReciente.name}</h5>
                <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-warning text-dark" style={{width: `${cursoReciente.completion}%`}}>{cursoReciente.completion}%</div>
                </div>
                </div>
                
            </div>
            <a href="#" className="btn btn-primary form-control buttonLogin"><b>Ver cursos terminados</b></a> 
      </div>
      

    </div>
  </div>
</div>
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
            return perfil();
        }else if(menu == 2){
            return cursos();
        }else{
            return <></>
        }
    }
    return(
        <>  
        <div className='flex'>
            <Sidebar className='autoheight lightbg'>
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