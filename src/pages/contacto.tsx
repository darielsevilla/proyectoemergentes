import axios from "axios";
import { useState } from "react";

export default function Contacto(){

    const [mail, setMail] = useState('');
    
    const enviarCorreo = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(mail);
        const url = `http://localhost:3001/send-email?email=${encodeURIComponent(mail)}`;
    
        const body = new URLSearchParams();
        body.append('email', mail);
    
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }
        };
    
        axios.post(url, body, config).then((res)=>{
            if (res.status === 200) {
                console.log("Correo enviado exitosamente!", res.data.message);
                alert("Correo enviado exitosamente.");
                window.location.reload();
            } else {
                alert("Error al enviar el correo.");
                console.error("Error al enviar el correo", res.data.message);
            }}).catch((error)=> {
                console.log("Error en la peticion", error.response.data.descripcion);
            });
            console.log("Peticion realizada");
    };

    return(<>
    
        <div className="contact-page">
            <div className="contact-form">
                <div className="myheader">
                    <a href="#"><img width= '50px' height='50px' src = "./imagenes/icono.png"></img></a>
                    <h1 className="myLogo">SmartLearn</h1>
                </div>
                <form className="myform">
                <div className="input-group">
                    <input  className="cosa" type="text" placeholder="Primer Nombre"/>
                    <input  className="cosa" type="text" placeholder="Primer Apellido"/>
                </div>
                <div className="input-group">
                    <input className="cosa" type="email" placeholder="Correo Electrónico" onChange={(event) => setMail(event.target.value)}/>
                    <input  className="cosa" type="text" placeholder="Número de telefono" />
                </div>
                <textarea className="ta" placeholder="Escribe un mensaje..."></textarea>
                <button className="nose2" type="submit" onClick={enviarCorreo}>Enviar Mensaje</button>
                </form>
            </div>

            <div className="contact-info">
                <h1><b>Información de Contacto</b></h1>
                <p><b>Di algo para comunicarte!</b></p>
                <ul>
                <li>
                    <span>📞</span> +1012 3456 789
                </li>
                <li>
                    <span>✉️</span> demo@gmail.com
                </li>
                <li>
                    <span>📍</span> 132 Dartmouth Street Boston, Massachusetts 02156 United States
                </li>
                </ul>
                <div className="social-icons">
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="LinkedIn">💼</a>
                </div>
            </div>
        </div>
    </>);
}