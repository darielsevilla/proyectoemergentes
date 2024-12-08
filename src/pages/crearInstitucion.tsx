import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Footerc from "./footer";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useRouter } from 'next/router';
export default function Createuser(){
    const [show, setShow] = useState(false);
    
    const router = useRouter();

    const handleClose = () =>{
        router.back(); 
        setShow(false)
    };
    const handleShow = () => setShow(true);
  
    const [message, setMessage] = useState("");
    const CustomModal=()=> {
        
        return (
          <div className="lightbg">
            
      
            <Modal className="customModal" show={show} backdrop="static" onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Registro exitoso!</Modal.Title>
              </Modal.Header>
              <Modal.Body>La institución fue registrada exitosamente!</Modal.Body>
              <Modal.Footer>
                
                <Button variant="success" onClick={handleClose}>
                  Regresar
                </Button>
               
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
    
   
    interface institucion{
        _id: string;
        name: string;
        address: string;
        telephone: string;
        country: string;
        city: string;


    }
    useEffect(() => {
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
    const [institucion, setInstitucion] = useState<institucion>({
        _id: "",
        name: "",
        address: "",
        telephone: "",
        country: "",
        city: "",

    });

    const setName = (param : string) =>{
        setInstitucion((institution)=>({...institution, name: param}))
    }

    const setID = (param : string) =>{
        setInstitucion((institucion)=>({...institucion, _id: param}))
    }

    const setNumber = (param : string) =>{
        setInstitucion((institucion)=>({...institucion, telephone: param}))
    }

    const setCountry = (param : string) =>{
        setInstitucion((institucion)=>({...institucion, country: param}))
    }

    const setCity = (param : string) =>{
        setInstitucion((institucion)=>({...institucion, city: param}))
    }

    const setAddress = (param : string) =>{
        setInstitucion((institucion)=>({...institucion, address: param}))
    }

  
    const error = () =>{
        if(message == ""){
            return(<></>)
        }
        return(<Alert className="margin-5pc" variant={"danger"}>
          {message}
        </Alert>)
    }
    const sendData = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(institucion.telephone.length != 8){
        setMessage("numero de telefono invalido");
      }else{
        setMessage("");
        try{
       
            let url = "http://localhost:3001/CreateInstitution";
        
            const body = {
                id: institucion._id,
                name: institucion.name,
                address: institucion.address,
                telephone: institucion.telephone,
                city: institucion.city,
                country: institucion.country,
            }

            const config = {
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin' : '*'
                }
            }
            const response = await axios.post(url, body, config);
            setShow(true);
        }catch(error){
            setMessage("el codigo de institución ya está en uso")
        }
        
      }
     
    }
    return(
        <>
            <div className="container loginWindow flex">

            
            <div className="containerCrear">
                <form className="formMargin lightbg needs-validation" noValidate onSubmit={sendData}>
                <h1>Registrar Institucion</h1>

                <div className="mb-3">
                <label htmlFor="userInput" className="form-label">Ingrese Nombre de Institución</label>
                <input type="text" onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setName(evt.target.value)}} className="form-control" id="userInput" placeholder="ej. Unitec" required/>
               
                </div>

                <div className="mb-3">
                <label htmlFor="passInput" className="form-label">Ingrese Codigo de institución</label>
                <input type="text" onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setID(evt.target.value)}} className="form-control" id="passInput" placeholder="ej. UTC343" required />
                </div>

                <div className="mb-3">
                <label htmlFor="lastNameInput" className="form-label">Ingrese Número de telefono</label>
                <input type="number"  onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setNumber(evt.target.value)}} pattern="[A-Za-z]+" className="form-control" id="lastNameInput" placeholder="ej. 94463694" required />
                </div>

                <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Ingrese Dirección</label>
                <input type="text"  onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setAddress(evt.target.value)}}  className="form-control" id="nameInput" placeholder="Ingrese dirección" required/>
                </div>

                <div className="mb-3">    
                <label htmlFor="emailInput" className="form-label">Ingrese País de Institución</label>
                <input type="text" onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setCountry(evt.target.value)}} className="form-control" id="emailInput" placeholder="ej. Honduras" required/>
                </div>

                <div className="mb-3">    
                <label htmlFor="codeInput" className="form-label">Ingrese Ciudad de Institución</label>
                <input type="text"  onChange={(evt:React.ChangeEvent<HTMLInputElement>)=>{setCity(evt.target.value)}} className="form-control" id="codeInput" placeholder="Tegucigalpa" required />
                </div>

                
                <div >
                    <button type="submit" className="btn btn-primary form-control buttonLogin margin-5pc"><b>Crear Institución</b></button>
                </div>
                {error()}
                </form>
            
            </div>
            </div>
            {CustomModal()}
            <Footerc></Footerc>
        </>
        
    );    
}