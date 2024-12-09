import {variables, courseInfo} from "@/data/data"
import axios from "axios";
import Link from "next/link";
import {useEffect, useState} from 'react'
export default function Perfil(){

    const obtenerCursosCompletados = async () => {
        const user_id = localStorage.getItem('userId');
      
        const url = `http://localhost:3001/getCursosCompletados?user_id=${user_id}`;
      
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        };
      
        axios.get(url,config).then((res)=>{
            if (res.status === 200) {
                console.log('Cursos completados:', res.data.resultado);
            const completedCourses = res.data.resultado.map((resultado: any) => ({
                id: resultado._id, 
                user_id: resultado.user_id,
                course_id: resultado.course_id,
                score: resultado.score,
                courseName: resultado.courseName
            }));
            console.log(completedCourses);
            localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
            } else {
                console.error("Error en la respuesta del servidor:", res.data.message);
            }
        }).catch((error)=> {
            console.log("Error en la peticion", error.response.data.descripcion);
        });
            console.log("Peticion realizada");
        }
      

    interface curso{
        id: string;
        name : string;
        completion: number;
    }
    const [courses,setCourses] = useState<curso[]>([
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

    const [showCoursesModal, setShowCoursesModal] = useState(false);

    const [showCompletedCoursesModal, setShowCompletedCoursesModal] = useState(false);

    const handleClickJefe = (id : string, name : string) =>{
        localStorage.setItem("currentCourse", id);
        localStorage.setItem("currentCourseName", name);
        console.log(id);
        console.log(name);
    }

    const handleClickDocente = async (id : string, name : string) =>{
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

    const placeCourses = () =>{
        obtenerCursosCompletados();
        const role = localStorage.getItem('role');
        const item = localStorage.getItem('courses')
        const list2 = item ? JSON.parse(item) : [];

        const item2 = localStorage.getItem('completedCourses')
        const list3 = item2 ? JSON.parse(item2) : [];
        console.log(list3);

        if(role == "Docente"){
            
           return(<>
                <div className="card-body">
                    <h3 className="card-title"><b>Cursos Activos</b></h3>
                <div className='cardSpace'>
                    {/*beginning of card */} 
                    {list2.slice(0,5).map((curso : any)=>
                    <Link onClick={()=> {handleClickDocente(curso.id, curso.name)}} href="/cursowindow" key = {curso.id}>
                    <div >
                            
                            <div className="card cardMargin">
                            
                            <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                            <h5 className="card-title">{curso.name}</h5>
                            <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-warning text-dark" style={{width: `${curso.completion}%`}}>{curso.completion}%</div>
                            </div>
                            </div>
                            
                        </div>

                    </div>
                    </Link>)}
                    
                

                {/*end of card */}
                <button className="btn btn-primary form-control buttonLogin" onClick={() => setShowCoursesModal(true)}><b>Ver cursos activos</b></button> 
                {showCoursesModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Cursos Creados</h4> 
                        <div className='course-list-container'>
                            {list2.map((curso:any)=>
                            <Link onClick={()=> {handleClickDocente(curso.id, curso.name)}} href="/cursowindow" key = {curso.id}>
                            <div key = {curso.id}>
                                <div className="card cardMargin">
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                                        <h5 className="card-title">{curso.name}</h5>
                                    </div>
                                </div>
                            </div>
                            </Link>)}
                        </div>
                        <div className="button-group">
                            <button className="btn btn-secondary" onClick={() => setShowCoursesModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
            <style>
                {`
                /* Estilos para el fondo del modal */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                /* Contenedor del modal */
                .modal-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 500px;
                    text-align: center;
                    position: relative;
                }

                /* Títulos del modal */
                .modal-content h4 {
                    margin-bottom: 20px;
                    font-size: 1.5rem;
                    color: #333;
                }

                /* Botones del modal */
                .modal-content .button-group {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .modal-content .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                }

                .modal-content .btn-primary {
                    background-color: #007bff;
                    color: #fff;
                }

                .modal-content .btn-primary:hover {
                    background-color: #0056b3;
                }

                .modal-content .btn-secondary {
                    background-color: #6c757d;
                    color: #fff;
                }

                .modal-content .btn-secondary:hover {
                    background-color: #5a6268;
                }

                /* Lista de cursos creados */
                .course-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    max-height: 200px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 20px;
                }

                .course-item {
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    text-align: left;
                }

                .course-item:last-child {
                    border-bottom: none;
                }

                .course-item strong {
                    color: #333;
                }

                .course-list-container {
                    max-height: 400px;
                    overflow-y: auto;  
                    margin-bottom: 20px;
                    padding-right: 10px;
                }
                
                .course-list-container::-webkit-scrollbar {
                    width: 15px; 
                }

                .course-list-container::-webkit-scrollbar-thumb {
                    background-color: black;  
                    border-radius: 10px;     
                }

                .course-list-container::-webkit-scrollbar-track {
                    background: #f0f0f0;  
                    border-radius: 10px;
                }
                `}
            </style>
                </div>
                {/* curso terminado */}
                <h3 className="card-title"><b>Cursos Terminado Más Reciente</b></h3>
                
                    {list3.slice(0,5).map((curso : any)=>
                    <Link onClick={()=> {handleClickDocente(curso.id, curso.courseName)}} href="/cursowindow" key = {curso.id}>
                    <div >
                            
                            <div className="card cardMargin">
                            
                            <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                            <h5 className="card-title">{curso.courseName}</h5>
                            <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={5}>
                                <div className="progress-bar bg-warning text-dark" style={{width: `${95}%`}}>{95}%</div>
                            </div>
                            </div>
                            
                        </div>

                    </div>
                    
                    </Link>)}
                    <button className="btn btn-primary form-control buttonLogin" onClick={() => setShowCompletedCoursesModal(true)}><b>Ver cursos terminados</b></button> 

                    {showCompletedCoursesModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Cursos Creados</h4> 
                        <div className='course-list-container'>
                            {list3.map((curso:any)=>
                            <Link onClick={()=> {handleClickDocente(curso.id, curso.courseName)}} href="/cursowindow" key = {curso.id}>
                            <div>
                                <div className="card cardMargin">
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                                        <h5 className="card-title">{curso.courseName}</h5>
                                    </div>
                                </div>
                            </div>
                            </Link>)}
                        </div>
                        <div className="button-group">
                            <button className="btn btn-secondary" onClick={() => setShowCompletedCoursesModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
            <style>
                {`
                /* Estilos para el fondo del modal */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                /* Contenedor del modal */
                .modal-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 500px;
                    text-align: center;
                    position: relative;
                }

                /* Títulos del modal */
                .modal-content h4 {
                    margin-bottom: 20px;
                    font-size: 1.5rem;
                    color: #333;
                }

                /* Botones del modal */
                .modal-content .button-group {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .modal-content .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                }

                .modal-content .btn-primary {
                    background-color: #007bff;
                    color: #fff;
                }

                .modal-content .btn-primary:hover {
                    background-color: #0056b3;
                }

                .modal-content .btn-secondary {
                    background-color: #6c757d;
                    color: #fff;
                }

                .modal-content .btn-secondary:hover {
                    background-color: #5a6268;
                }

                /* Lista de cursos creados */
                .course-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    max-height: 200px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 20px;
                }

                .course-item {
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    text-align: left;
                }

                .course-item:last-child {
                    border-bottom: none;
                }

                .course-item strong {
                    color: #333;
                }

                .course-list-container {
                    max-height: 400px;
                    overflow-y: auto;  
                    margin-bottom: 20px;
                    padding-right: 10px;
                }
                
                .course-list-container::-webkit-scrollbar {
                    width: 15px; 
                }

                .course-list-container::-webkit-scrollbar-thumb {
                    background-color: black;  
                    border-radius: 10px;     
                }

                .course-list-container::-webkit-scrollbar-track {
                    background: #f0f0f0;  
                    border-radius: 10px;
                }
                `}
            </style>
            </div>
  


           </>); 
        }else{
            return(<>
            <div className="card-body">
                    <h3 className="card-title"><b>Ver cursos</b></h3>
                <div className='cardSpace'>
                    {/*beginning of card */} 
                    {list2.slice(0,5).map((curso:any)=>
                    <Link onClick={()=>{handleClickJefe(curso.id, curso.name)}} href="/AcademicChief/viewcourse" key = {curso.id}>
                    <div >
                            <div className="card cardMargin">
                                <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                                <h5 className="card-title">{curso.name}</h5>
                            </div>
                            
                        </div>
                    </div>
                    </Link>)}
                    
                    <button className="btn btn-primary form-control buttonLogin" onClick={() => setShowCoursesModal(true)}><b>Ver cursos creados</b></button> 

                
                </div>
            </div>
            
            {showCoursesModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Cursos Creados</h4>
                        <div className='course-list-container'>
                            {list2.map((curso:any)=>
                            <Link onClick={()=>{handleClickJefe(curso.id, curso.name)}} href="/AcademicChief/viewcourse" key = {curso.id}>
                            <div>
                                <div className="card cardMargin">
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                                        <h5 className="card-title">{curso.name}</h5>
                                    </div>
                                </div>
                            </div>
                            </Link>)}
                        </div>
                        <div className="button-group">
                            <button className="btn btn-secondary" onClick={() => setShowCoursesModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
            <style>
                {`
                /* Estilos para el fondo del modal */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                /* Contenedor del modal */
                .modal-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 500px;
                    text-align: center;
                    position: relative;
                }

                /* Títulos del modal */
                .modal-content h4 {
                    margin-bottom: 20px;
                    font-size: 1.5rem;
                    color: #333;
                }

                /* Botones del modal */
                .modal-content .button-group {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .modal-content .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                }

                .modal-content .btn-primary {
                    background-color: #007bff;
                    color: #fff;
                }

                .modal-content .btn-primary:hover {
                    background-color: #0056b3;
                }

                .modal-content .btn-secondary {
                    background-color: #6c757d;
                    color: #fff;
                }

                .modal-content .btn-secondary:hover {
                    background-color: #5a6268;
                }

                /* Lista de cursos creados */
                .course-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    max-height: 200px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 20px;
                }

                .course-item {
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    text-align: left;
                }

                .course-item:last-child {
                    border-bottom: none;
                }

                .course-item strong {
                    color: #333;
                }

                .course-list-container {
                    max-height: 400px;
                    overflow-y: auto;  
                    margin-bottom: 20px;
                    padding-right: 10px;
                }
                
                .course-list-container::-webkit-scrollbar {
                    width: 15px; 
                }

                .course-list-container::-webkit-scrollbar-thumb {
                    background-color: black;  
                    border-radius: 10px;     
                }

                .course-list-container::-webkit-scrollbar-track {
                    background: #f0f0f0;  
                    border-radius: 10px;
                }
                `}
            </style>
            </>);
        }
    }

    const [showModal, setShowModal] = useState(false);
    
    const [nombre, setNombre] = useState(localStorage.getItem("name") || "");
    const [apellido, setApellido] = useState(localStorage.getItem("lastName") || "");
    const [username, setUsername] = useState(localStorage.getItem("userName") || "");

    const show = () =>{
        //obtenerCursosCompletados();
        setShowModal(true)
        setNombre(localStorage.getItem("name") || "");
        setApellido(localStorage.getItem("lastName") || "");
        setUsername(localStorage.getItem("userName") || "");
    }

    const realizarPeticion = async() => {
        let url = "http://localhost:3001/updateUser";

        const body = {
            userId: localStorage.getItem('userId'),
            name: nombre,
            lastName: apellido,
            userName: username
        }

        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
            }
        }

        axios.patch(url, body, config).then((res)=>{
            if (res.status === 200) {
                localStorage.setItem('userName', username);
                localStorage.setItem('name', nombre);
                localStorage.setItem('lastName', apellido);
                alert("Usuario modificado exitosamente.");
                setShowModal(false);
            } else {
                console.error("Error en la respuesta del servidor:", res.data.message);
            }
        }).catch((error)=> {
            console.log("Error en la peticion", error.response.data.descripcion);
        });
        console.log("Peticion realizada");
    }

    const guardarCambios = () =>{
        console.log(nombre, apellido, username);
        realizarPeticion();
    }

    return(<>
        <div className='container'>
            {/*left side */}
            <div className="card mb-3">
                <div className="row g-0 ">
                    <div className="col-md-4">
                        <div className='horizontalCenter'>

                        <img src="/imagenesCurso/data_structures_cover.jpg" className="img-fluid heightPfCard  rounded-circle mt-4" alt="..." />
                        
                        <h3 className="card-title">@{localStorage.getItem('userName')}</h3>
                        <h4 className="card-title">{localStorage.getItem('name')} {localStorage.getItem('lastName')}</h4>
                        <button className="btn btn-primary form-control buttonLogin cardWidth" onClick={show}><b>Editar Perfil</b></button>
                        </div>
                        </div>
                        {/*right side*/}
                        <div className="col-md-8">
                                {placeCourses()}

                        </div>
                </div>
            </div>
        </div>
    
        {showModal && (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>Editar Perfil</h4>
                <div className="form-group">
                    <label htmlFor="editName">Nombre</label>
                    <input type="text" id="editName" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Editar nombre"/>
                </div>
                <div className="form-group">
                    <label htmlFor="editLastName">Apellido</label>
                    <input type="text" id="editLastName" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Editar apellido"/>
                </div>
                <div className="form-group">
                    <label htmlFor="editUsername">Nombre de Usuario</label>
                    <input type="text" id="editUsername" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Editar nombre de usuario"/>
                </div>
                <div className="button-group">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                    <button className="btn btn-primary" onClick={guardarCambios}>Guardar cambios</button>
                </div>
            </div>
            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    width: 400px;
                    text-align: left;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                .form-control {
                    width: 100%;
                    padding: 8px;
                    margin-top: 5px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .button-group {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 20px;
                }
            `}</style>
        </div>
)}
    </>);
}