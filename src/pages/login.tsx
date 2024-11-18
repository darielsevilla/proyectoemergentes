

export default function Login() {
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
            <input className="form-control" type="text" placeholder="Ingrese nombre de usuario" aria-label="default input example" />
            <h6 className="card-text margint"><b>Contraseña</b></h6>
            <input className="form-control" type="text" placeholder="Ingrese contraseña" aria-label="default input example" />
            <a href="#" className="btn btn-primary margint form-control buttonLogin"><b>Iniciar Sesión</b></a>    
        </div>
        </div>
        </>

    );
}