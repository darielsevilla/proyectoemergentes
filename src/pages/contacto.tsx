export default function Contacto(){
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
                    <input className="cosa" type="email" placeholder="Correo Electrónico"/>
                    <input  className="cosa" type="text" placeholder="Número de telefono" />
                </div>
                <textarea className="ta" placeholder="Escribe un mensaje..."></textarea>
                <button className="nose2" type="submit">Enviar Mensaje</button>
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