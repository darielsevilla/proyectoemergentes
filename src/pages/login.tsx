import Link from "next/link";
import Footerc from "./footer";
import {useState,useEffect} from "react"
import axios from 'axios';
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    
    const [isMounted, setIsMounted] = useState(false);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
   
    const realizarPeticion = async() => {
        let url = "http://localhost:3001/logIn";

        const body = {
            userName: userName,
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
                localStorage.setItem('userName', res.data.user.userName);
                localStorage.setItem('name', res.data.user.name);
                localStorage.setItem('lastName', res.data.user.lastName);
                localStorage.setItem('role', res.data.user.role);
                router.push('/msdocente');
            } else {
                console.error("Error en la respuesta del servidor:", res.data.message);
            }
        }).catch((error)=> {
            console.log("Error en la peticion", error.response.data.descripcion);
        });
        console.log("Peticion realizada");
    
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
            <h6 className="card-text margint"><b>Nombre de usuario</b></h6>
            <input className="form-control" type="text" placeholder="Ingrese nombre de usuario" aria-label="default input example" onChange={(event) => setUserName(event.target.value)}/>
            <h6 className="card-text margint"><b>Contraseña</b></h6>
            <input className="form-control" type="text" placeholder="Ingrese contraseña" aria-label="default input example" onChange={(event) => setPassword(event.target.value)}/>
            
            <button className="btn btn-primary margint form-control buttonLogin" onClick={realizarPeticion}><b>Iniciar Sesión</b></button>
            <Link href="/crearUsuario"><button className="btn btn-primary margin-5pc form-control bottonRegister"><b>Registrate</b></button> </Link>   
        </div>
        </div>
        
      
            <Footerc></Footerc>
        
    
        </>

    );
}