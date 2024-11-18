import { Container } from "react-bootstrap";

export default function Createuser(){
    return(
        <>
            <div className="container formMargin lightbg">
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="nombre@ejemplo.com" />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                </div>
            </div>
        </>
        
    );    
}