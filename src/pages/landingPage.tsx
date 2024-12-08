import Footerc from "./footer";

export default function LandingPage(){
    return(<>
            <nav className="navbar lightbg navbar-expand-lg">
                <div className="container-fluid d-flex align-items-center">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src="./imagenes/icono.png" alt="Logo" width="50" height="50" className="d-inline-block"/>
                        <span className="ms-3 fs-4">SmartLearn</span>
                    </a>
                    <div className="navbar-nav d-flex align-items-center ms-auto flex-grow-1 justify-content-start">
                        <a className="nose" href="/contacto">
                            Contactanos
                        </a>
                        <a className="nose" href="/crearInstitucion">
                            Registrar Institución
                        </a>
                        <a className="nose" href="/crearUsuario">
                            Registrate
                        </a>
                    </div>
                    {/* <form className="d-flex ms-3" role="search">
                        <div className="input-group">
                            <input className="form-control" type="search" placeholder="Buscar" aria-label="Search"/>
                            <button className="btn btn-outline-secondary" type="submit">Buscar</button>
                        </div>
                    </form> */}
                    <a href="/login" className="ms-4 me-4">
                    <   img width= '45px' height='45px' src = "./imagenes/perfil_icon.png"></img>
                    </a>
                </div>
            </nav>

            <div className="homeContainer mt-5 mx-5">
                <div className="row g-5 mb-4">
                    <div className="col">
                        <div className="card text-bg-dark mt-4 hover-card">
                            <img src="./imagenes/home1.png" className="card-img" alt="Imagen de la tarjeta" style={{ objectFit: "cover", height: "400px", opacity: 0.6}}/>
                            <div className="card-img-overlay">
                                <h3 className="card-title"><b>Aprendizaje Interactivo</b></h3>
                                <p className="card-text">Con actividades cortas y practicas</p>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#aprendizaje" style={{position: "absolute",bottom: "10px",right: "10px"}}>Explorar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-bg-dark mt-4 hover-card">
                            <img src="./imagenes/home2.jpg" className="card-img" alt="Imagen de la tarjeta" style={{ objectFit: "cover", height: "400px", opacity: 0.6}}/>
                            <div className="card-img-overlay">
                                <h3 className="card-title"><b>Aprende con Inteligencía Artificial</b></h3>
                                <p className="card-text">Entrenate usando nuevas herramientas</p>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ia" style={{position: "absolute",bottom: "10px",right: "10px"}}>Explorar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-5 mb-5">
                <div className="col">
                        <div className="card text-bg-dark mt-4 hover-card">
                            <img src="./imagenes/home3.png" className="card-img" alt="Imagen de la tarjeta" style={{ objectFit: "cover", height: "400px",opacity: 0.6 }}/>
                            <div className="card-img-overlay">
                                <h3 className="card-title"><b>Apoya en la preparacion de clases</b></h3>
                                <p className="card-text">Utiliza la estructura de unidades para ayudar a estructurar clases</p>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#preparacion_clases" style={{position: "absolute",bottom: "10px",right: "10px"}}>Explorar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-bg-dark mt-4 hover-card">
                            <img src="./imagenes/home4.png" className="card-img" alt="Imagen de la tarjeta" style={{ objectFit: "cover", height: "400px",opacity: 0.6 }}/>
                            <div className="card-img-overlay">
                                <h3 className="card-title"><b>Crea nuevos cursos</b></h3>
                                <p className="card-text">Garantiza preparacion docente</p>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#crear_curso" style={{position: "absolute",bottom: "10px",right: "10px"}}>Explorar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id="crear_curso" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Crea nuevos cursos</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src="./imagenes/crear_curso_home.png" alt="Crea nuevos cursos" className="img-fluid rounded mb-3"/>
                        <p>La creación de nuevos cursos es una herramienta esencial para garantizar la preparación docente. Con esta funcionalidad, los educadores pueden estructurar y planificar contenidos personalizados para sus alumnos, incorporando recursos interactivos y herramientas de aprendizaje modernas.</p>
                        <p>Explora nuevas formas de organizar el aprendizaje y utiliza las unidades temáticas para desarrollar clases más efectivas. ¡Optimiza el proceso de enseñanza y crea cursos que marquen la diferencia!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="preparacion_clases" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel"> Apoya en la preparación de clasess</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src="./imagenes/preparacion_clases.jpg" alt="Crea nuevos cursos" className="img-fluid rounded mb-3"/>
                        <p>La planificación de clases es clave para lograr un aprendizaje efectivo. Con esta herramienta, los docentes pueden utilizar una estructura basada en unidades para organizar temas, actividades y recursos de manera ordenada.</p>
                        <p>Facilita la preparación al dividir el contenido en bloques temáticos, permitiendo una enseñanza más clara y estructurada. Esta funcionalidad está diseñada para ahorrar tiempo y garantizar que tus clases sean dinámicas y completas.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="ia" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel"> Apoya en la preparación de clasess</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src="./imagenes/ia.jpg" alt="Crea nuevos cursos" className="img-fluid rounded mb-3"/>
                        <p>La inteligencia artificial está transformando la forma en que aprendemos y nos capacitamos. Con herramientas innovadoras, puedes mejorar tus habilidades y explorar nuevos enfoques educativos.</p>
                        <p>Entrénate utilizando tecnologías avanzadas que personalizan tu experiencia de aprendizaje, optimizan tu tiempo y te ofrecen recursos adaptados a tus necesidades. ¡Descubre cómo la IA puede potenciar tu conocimiento y crecimiento profesional!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="aprendizaje" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"> Apoya en la preparación de clasess</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src="./imagenes/aprendizaje_interactivo.jpg" alt="Crea nuevos cursos" className="img-fluid rounded mb-3"/>
                        <p>El aprendizaje interactivo está diseñado para hacer que el proceso educativo sea más dinámico y efectivo. Con actividades cortas y prácticas, los estudiantes pueden consolidar sus conocimientos de manera rápida y entretenida.</p>
                        <p>Esta metodología fomenta la participación activa, el pensamiento crítico y el aprendizaje práctico, adaptándose a diferentes estilos de enseñanza y necesidades individuales. ¡Descubre una forma más atractiva de aprender!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                    </div>
                    </div>
                </div>
            </div>
            <Footerc></Footerc>
    </>);
}