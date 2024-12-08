import Link from "next/link";
import Footerc from "./footer";
import {useState,useEffect} from "react"
import axios from 'axios';
import { useRouter } from "next/router";
import Alert from 'react-bootstrap/Alert';

export default function Login() {
    const router = useRouter();
    
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
   
    const logInFireBase = async() => {
        let url = "http://localhost:3001/logInFirebase";
      
        const body = {
            mail: mail,
            password: password
        }

        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
            }
        }

        axios.post(url, body, config).then((res)=>{
            if (res.status === 200) {
                realizarPeticion();
            } else {
                console.error("Error en la respuesta del servidor:", res.data.message);
            }
            setError(false);
        }).catch((error)=> {
            setError(true);
            console.log("Error en la peticion", error.response.data.descripcion);
        });
        console.log("Peticion realizada");
    }

    const realizarPeticion = async() => {
        let url = "http://localhost:3001/logIn";
      
        const body = {
            mail: mail
        }

        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
            }
        }

        axios.post(url, body, config).then((res)=>{
            if (res.status === 200) {
                localStorage.setItem('userId', res.data.user._id)
                localStorage.setItem('userName', res.data.user.userName);
                localStorage.setItem('name', res.data.user.name);
                localStorage.setItem('lastName', res.data.user.lastName);
                localStorage.setItem('role', res.data.user.role);
                localStorage.setItem('institutionID', res.data.user.institutionID);
                
                

                //actualizar cursos
                const courses = res.data.courses.map((course: any) => ({
                    id: course._id, 
                    img: course.image,
                    creator: course.user_name,
                    description: course.description,
                    name: course.name,
                    timeCreated: course.creationDate, 
                    units: course.units,
                    completionRequirement: course.completionRequirement,
                    institutionID: course.institutionID
                }));
                console.log(courses);
                localStorage.setItem('courses', JSON.stringify(courses));
                
                if(res.data.user.role == "Docente"){
                    
                    router.push('/msdocente');
                }else{
                    router.push('/AcademicChief/msjefe');
                }
               
                
            } else {
                console.error("Error en la respuesta del servidor:", res.data.message);
            }
        }).catch((error)=> {
            console.log("Error en la peticion", error.response.data.descripcion);
        });
        console.log("Peticion realizada");
    
    }

    const errorMsg = () =>{
        if(!error){
            return(<></>);
        }
        return(
            <Alert variant={"danger"} className="margin-5pc">
                Correo y/o contraseña incorrecta
            </Alert>
        );
    }
    return(
        <>
        <div className="loginContainer">
        {/*top bar */}
        <div className="toplogin lightbg">
            <div className="flex centerS">
                <a href="#">
                    <img width= '50px' height='50px' src = "./imagenes/icono.png"></img>
                </a>
                <p className="centerS">SmartLearn</p>
            </div>
            <a href="#">
                    <img width= '50px' height='50px' src = "./imagenes/question.png"></img>
            </a>
        </div>

        {/* bottom bar */}    
        <div className = "bottomBar lightbg" />

        <div className="card-body loginCard ">
            <h2 className="card-title"><b>Iniciar Sesión</b></h2>
            <h6 className="card-text margint"><b>Correo Electrónico</b></h6>
            <input className="form-control" type="text" placeholder="Ingrese correo electrónico" aria-label="default input example" onChange={(event) => setMail(event.target.value)}/>
            <h6 className="card-text margint"><b>Contraseña</b></h6>
            <input className="form-control" type="password" placeholder="Ingrese contraseña" aria-label="default input example" onChange={(event) => setPassword(event.target.value)}/>
            
            <button className="btn btn-primary margint form-control buttonLogin" onClick={logInFireBase}><b>Iniciar Sesión</b></button>
            <Link href="/crearUsuario"><button className="btn btn-primary margin-5pc form-control bottonRegister"><b>Registrate</b></button> </Link>   
            {errorMsg()}
        </div>
        </div>
        

            <Footerc></Footerc>
        
    
        </>

    );
}