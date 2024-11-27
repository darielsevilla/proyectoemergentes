import {variables, courseInfo} from "@/data/data"
import {useState} from 'react'
export default function Perfil(){
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

    const placeCourses = () =>{
        const role = localStorage.getItem('role');
        const item = localStorage.getItem('courses')
        const list2 = item ? JSON.parse(item) : [];

        if(role == "Docente"){
            
           return(<>
                <div className="card-body">
                    <h3 className="card-title"><b>Cursos Activos</b></h3>
                <div className='cardSpace'>
                    {/*beginning of card */} 
                    {list2.map((curso : any)=><div key = {curso.id}>
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
  


           </>); 
        }else{
            return(<>
            <div className="card-body">
                    <h3 className="card-title"><b>Ver cursos</b></h3>
                <div className='cardSpace'>
                    {/*beginning of card */} 
                    {list2.map((curso:any)=><div key = {curso.id}>
                            <div className="card cardMargin">
                                <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-body-secondary">Curso</h6>
                                <h5 className="card-title">{curso.name}</h5>
                            </div>
                            
                        </div>
                    </div>)}
                    
                    <a href="#" className="btn btn-primary form-control buttonLogin"><b>Ver cursos creados</b></a> 

                
                </div>
            </div>
            </>);
        }
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
                        <a href="#" className="btn btn-primary form-control buttonLogin cardWidth"><b>Editar Perfil</b></a> 
                        </div>
                        </div>
                        {/*right side*/}
                        <div className="col-md-8">
                                {placeCourses()}

                        </div>
                </div>
            </div>
        </div>
    
    
    </>);
}