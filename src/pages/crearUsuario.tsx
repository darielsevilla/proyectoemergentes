import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Footerc from "./footer";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'

export default function Createuser(){
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);
    const CustomModal=()=> {
        
        return (
          <div className="lightbg">
            
      
            <Modal className="customModal" show={show} backdrop="static" onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Felicidades!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Te registraste exitosamente!</Modal.Body>
              <Modal.Footer>
                <Link href="/login">
                <Button variant="success" onClick={handleClose}>
                  Regresar
                </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
    
    const CustomModalError=()=> {
        
        return (
          <div className="lightbg">
            
      
            <Modal className="customModalError" show={showError} backdrop="static" onHide={handleCloseError}>
              <Modal.Header>
                <Modal.Title>Error!</Modal.Title>
              </Modal.Header>
              <Modal.Body>No se pudo crear el usuario!</Modal.Body>
              <Modal.Footer>
                
                <Button variant="success" onClick={handleCloseError}>
                  Regresar
                </Button>
             
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
    interface user{
        name: string;
        lastName: string;
        mail: string;
        username: string;
        password: string;
        institutionID: string;
        role: string;

    }
    useEffect(() => {
        // Bootstrap form validation logic
        const forms = document.querySelectorAll(".needs-validation");
    
        Array.from(forms).forEach((form) => {
            
          form.addEventListener(
            "submit",
            (event) => {
              if (!(form as HTMLFormElement).checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      }, []);
    const [response, setResponse] = useState(0);
    const [user, setUser] = useState<user>({
        name: "",
        lastName:"",
        mail:"",
        username:"",
        password:"",
        institutionID:"",
        role:" ",

    });

    const setName = (param : string) =>{
        setUser((user)=>({...user, name: param}))
    }

    const setLastName = (param : string) =>{
        setUser((user)=>({...user, lastName: param}))
    }

    const setMail = (param : string) =>{
        setUser((user)=>({...user, mail: param}))
    }

    const setUsername = (param : string) =>{
        setUser((user)=>({...user, username: param}))
    }

    const setPassword = (param : string) =>{
        setUser((user)=>({...user, password: param}))
    }

    const setInstitutionID = (param : string) =>{
        setUser((user)=>({...user, institutionID: param}))
    }

    const setRole = (param : string) =>{
        setUser((user)=>({...user, role: param}))
    }

    const sendData = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      
      console.log("Datos enviados en el body:", JSON.stringify(user)); // Imprime el contenido del body
        try {

          const params2 = new URLSearchParams();
          params2.append("email", user.mail);
          params2.append("password", user.password);

          const params = new URLSearchParams();
          params.append("name", user.name);
          params.append("lastName", user.lastName);
          params.append("mail", user.mail);
          params.append("userName", user.username);
          //params.append("password", user.password);
          params.append("institutionID", user.institutionID);
          params.append("role", user.role);

          const response2 = await fetch("http://localhost:3001/signUpFirebase", {
              method: "POST",
              mode: "cors",
              headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
              },
              body: params2.toString(),
          });
          setResponse(response2.status);
            if(response2.status == 200){
                handleShow();
            }else if(response2.status==402){
                handleShowError()
            }
            console.log("Estado de la respuesta:", response2.status);

              const response = await fetch("http://localhost:3001/signUp", {
              method: "POST",
              mode: "cors",
              headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
              },
              body: params.toString(),
            });
            setResponse(response.status);
            if(response.status == 200){
                handleShow();
            }else if(response.status==402){
                handleShowError()
            }
            console.log("Estado de la respuesta:", response.status);
          } catch (e) {
            console.log(e);
          }
    }
    return(
        <>
            <div className="container loginWindow flex">

            
            <div className="containerCrear">
                <form className="formMargin lightbg needs-validation" noValidate onSubmit={sendData}>
                <h1>Crear Usuario</h1>

                <div className="mb-3">
                <label htmlFor="userInput" className="form-label">Ingrese Nombre de Usuario</label>
                <input type="text" onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setUsername(evt.target.value)}} className="form-control" id="userInput" placeholder="Ingrese nombre de usuario" required/>
               
                </div>

                <div className="mb-3">
                <label htmlFor="passInput" className="form-label">Ingrese Contraseña</label>
                <input type="password" onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setPassword(evt.target.value)}} className="form-control" id="passInput" placeholder="Ingrese contraseña" required />
                </div>

                <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Ingrese Nombre</label>
                <input type="text"  onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setName(evt.target.value)}} pattern="[A-Za-z]+" className="form-control" id="nameInput" placeholder="Ingrese nombre" required/>
                </div>
            
                <div className="mb-3">
                <label htmlFor="lastNameInput" className="form-label">Ingrese Apellido</label>
                <input type="text"  onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setLastName(evt.target.value)}} pattern="[A-Za-z]+" className="form-control" id="lastNameInput" placeholder="Ingrese apellido" required />
                </div>

                <div className="mb-3">    
                <label htmlFor="emailInput" className="form-label">Ingrese correo</label>
                <input type="email" onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setMail(evt.target.value)}} className="form-control" id="emailInput" placeholder="nombre@ejemplo.com" required/>
                </div>

                <div className="mb-3">    
                <label htmlFor="codeInput" className="form-label">Ingrese codigo de institución</label>
                <input type="text"  onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setInstitutionID(evt.target.value)}} className="form-control" id="codeInput" placeholder="ej. UTC343" required />
                </div>

                <label htmlFor="rolInput" className="form-label">Ingrese su rol en la institución</label>
                <select id = "rolInput" onChange={(evt:React.ChangeEvent<HTMLSelectElement>)=>{setRole(evt.target.value)}} className="form-select" aria-label="Default select example">
                    <option value="Docente">Docente</option>
                    <option value="Jefe">Jefe Academico</option>
                </select>
                <div >
                    <button type="submit" className="btn btn-primary form-control buttonLogin margin-5pc"><b>Registrarse</b></button>
                    </div>
                </form>

            </div>
            </div>
            {CustomModal()}
            <Footerc></Footerc>
        </>
        
    );    
}