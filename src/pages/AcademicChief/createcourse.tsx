import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { unstable_noStore } from 'next/cache';

export default function CreateCourse(){

    const [validated, setValidated] = useState(false);
    const [validatedConcept, setValidatedConcept] = useState(true);

    //modal states
    const [show, setShow] = useState(false);
    const [conceptModal, setConceptModal] = useState(false)
    const [showExam, setShowExam] = useState(false)

    //interfaces needed
    interface ConceptoClave{
        concepto : string;
        definicion : string;
        img? :  File | null | undefined;
    }
    interface ExamQuestion{
        question: string;
        optiona : string;
        optionb : string;
        optionc : string;
        optiond : string;
        correctOp : number;
    }
    
    interface Resource{
        pdfUrl? : File | null | undefined;
        videoUrl? : string;
    }
    interface unit{
        name: string;
        number : number;
        conceptosClave : ConceptoClave[];
        recursos: Resource[];
        examples: Resource[];
    }

    //course values needed
    const courseName = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const image = useRef<HTMLInputElement>(null);
    const [units, setUnits] = useState<unit[]>([]);
    const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);

    //unit values 
    const [unitName, setUnitName] = useState("");
    const pdfFile = useRef<HTMLInputElement>(null);
    const youtubeVid = useRef<HTMLInputElement>(null);
    const pdfFile2 = useRef<HTMLInputElement>(null);
    const youtubeVid2 = useRef<HTMLInputElement>(null);
    const [resources, setResources] = useState<Resource[]>([]);
    const [examples, setExamples] = useState<Resource[]>([]);
    const [vocab, setVocab] = useState<ConceptoClave[]>([]);
    const [num, setNum] = useState(-1);

    //vocab values 
    const vocabWord = useRef<HTMLInputElement>(null);
    const definitionBox = useRef<HTMLInputElement>(null);
    const conceptImage = useRef<HTMLInputElement>(null);
    //valueupdates

    //other validations
    const [repeatedWord, setRepeatedWord] = useState(false);
    const [noUnit,setNoUnit] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);

    //exam questions
    const pregunta = useRef<HTMLInputElement>(null);
    const op1 = useRef<HTMLInputElement>(null);
    const op2 = useRef<HTMLInputElement>(null);
    const op3 = useRef<HTMLInputElement>(null);
    const op4 = useRef<HTMLInputElement>(null);
    const respuesta = useRef<HTMLInputElement>(null);

    //delete
    const [selectDeleteWord, setSelectDeleteWord] = useState(-1);
    const deleteWord = () =>{
        if(selectDeleteWord != -1){
            
            setVocab(vocab=> vocab.filter((s,i)=>(i != selectDeleteWord)))
            setSelectDeleteWord(-1);
        }
    }
    const [deleteR, setDeleteR] = useState(-1);
    const deleteResourse = () =>{
        if(deleteR != -1){
            setResources(resources => resources.filter((s,i)=>(i != deleteR)))
            setDeleteR(-1);
        }
    }
    const [deleteE, setDeleteE] = useState(-1);
    const deleteExample = () =>{
        if(deleteE != -1){
            setExamples(examples => examples.filter((s,i)=>(i != deleteE)))
            setDeleteE(-1);
        }
    }

    const [deleteQ, setDeleteQ] = useState(-1);
    const deleteQuestion = () =>{
        if(deleteQ != -1){
            setExamQuestions(question => examQuestions.filter((s,i)=>(i != deleteQ)))
            setDeleteQ(-1);
        }
    }
    //other controls
   
    const addFileResources = () =>{
        setResources([...resources, {pdfUrl : pdfFile.current?.files ? pdfFile.current?.files[0] : null}])
    }
    const addVideoResources = () =>{
        setResources([...resources, {videoUrl : youtubeVid.current?.value ? youtubeVid.current?.value : ""}])
    }

    const addFileExamples = () =>{
        setExamples([...examples, {pdfUrl : pdfFile2.current?.files ? pdfFile2.current?.files[0] : null}])
    }
    const addVideoExamples = () =>{
        setExamples([...examples, {videoUrl : youtubeVid2.current?.value ? youtubeVid2.current?.value : ""}])
    }

    const modifyUnit =  (number : number) =>{
        setNum(number);
        setValidated(false);
        setShow(true);
        console.log(units)
        
        const unit = units.find((un)=>un.number==number);
        console.log(unit)

        setExamples(unit?.examples ? unit.examples : []);
        setResources(unit?.recursos ? unit.recursos : [] );
        setVocab(unit?.conceptosClave ? unit.conceptosClave : []);
        setUnitName(unit?.name ? unit.name : "");
       


    }
    
    const addQuestion = () =>{
        

        setExamQuestions([...examQuestions, {
            question: pregunta.current ? pregunta.current.value : "",
            optiona: op1.current ? op1.current.value : "",
            optionb: op2.current ? op2.current.value : "",
            optionc: op3.current ? op3.current.value : "",
            optiond: op4.current ? op4.current.value : "",
            correctOp: respuesta.current ? Number(respuesta.current.value) : 0
        }])
        
        if(pregunta.current){
            pregunta.current.value = ""
        }

        if(op1.current){
            op1.current.value = ""
        }

        if(op2.current){
            op2.current.value = ""
        }

        if(op3.current){
            op3.current.value = ""
        }

        if(op4.current){
            op4.current.value = ""
        }

        if(respuesta.current){
            respuesta.current.value = ""
        }
    }

    //modal controls
    const closeUnit = () =>{
        setResources([]);
        setExamQuestions([]);
        setVocab([]);
        setExamples([]);
        setNum(-1);
        setListEmpty(false);
        setShow(false);
        setUnitName("")
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseConcept = () => setConceptModal(false);
    const handleOpenConcept = () => setConceptModal(true);
    const handleCloseExam = () => setShowExam(false);
    const handleOpenExam = () => setShowExam(true);
    const updateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUnitName(e.target.value); 
    };
    
    const UnitWindow = () =>{
        return(<Modal show={show} onHide={closeUnit} animation={false}>
        <Modal.Header className = "colorMonitorTable whitetxt" closeButton>
          {(num == -1) ? <Modal.Title>Crear Unidad</Modal.Title> : <Modal.Title>Modificar Unidad</Modal.Title> }
        </Modal.Header>
        <Modal.Body className = "colorMonitorTable whitetxt">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="unitName">
                        <Form.Label className='whitetxt' column sm={3}>
                            Nombre: 
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control  value={unitName} onChange={updateChange} required type="text" placeholder="Nombre de la unidad"  />
                        </Col>
                </Form.Group>

               
                {/*conceptos clave */}
                <hr className="whitetxt"></hr>
                <h3 className='whitetxt'>Conceptos clave</h3>
                <div className='flex'>
                    <Button variant="primary" className = "btnHeight barMargin buttonKeyConcept" onClick={handleOpenConcept}>Añadir Concepto +</Button>
                    <Button variant="secondary" className='barMargin'  onClick={deleteWord}>Eliminar</Button>
                </div>
                
                {KeyConceptWindow()}
                <div className='boxModal'>
                <ListGroup>
                    {vocab.map((word, i)=><ListGroup.Item key ={word.concepto} onClick={()=>{setSelectDeleteWord(i)}} className='unitItem' style={{backgroundColor : selectDeleteWord == i ?  "#9E9A92" : "transparent"}} >
                        {word.concepto}
                    </ListGroup.Item>)}
                </ListGroup>
                </div>

                 {/*Recursos */}
                <hr className="whitetxt"></hr>
                <h3 className='whitetxt'>Recursos</h3>
                <Form.Group controlId="formFile" className="mb-3 marginModal">
                    <Form.Label>Añadir PDF</Form.Label>
                    <Form.Control type="file" size="sm" ref={pdfFile} />
                </Form.Group>
                <Button variant="primary" className = "btnHeight barMargin buttonKeyConcept" onClick={addFileResources}>Añadir Documento</Button>
                
                <Form.Group controlId="formFile" className="mb-3 marginModal">
                    <Form.Label>Añadir video</Form.Label>
                    <Form.Control type="txt" size="sm" placeholder = "ej. https://www.youtube.com/watch?v=example" ref={youtubeVid}/>
                </Form.Group>
                <Button variant="primary" className = "btnHeight barMargin buttonKeyConcept" onClick={addVideoResources}>Añadir Video</Button>
                <br></br>
                <Button variant="secondary" className='barMargin marginModal'  onClick={deleteResourse}>Eliminar</Button>
                <div className='boxUnits'>
                    
                <ListGroup>
                {resources.map((resource,i)=><ListGroup.Item action onClick={()=>{setDeleteR(i)}} className='unitItem' style={{backgroundColor : deleteR == i ?  "#9E9A92" : "transparent"}}>
                        {resource.pdfUrl ? resource.pdfUrl.name : resource.videoUrl}
                    </ListGroup.Item>)}
                </ListGroup>
                </div>

                {/*ejemplo */}
                <hr className="whitetxt"></hr>
                <h3 className='whitetxt'>Ejemplos</h3>
                <Form.Group controlId="formFileEx" className="mb-3 marginModal">
                    <Form.Label>Añadir PDF</Form.Label>
                    <Form.Control type="file" size="sm" ref={pdfFile2} />
                </Form.Group>
                <Button variant="primary" className = "btnHeight barMargin buttonKeyConcept" onClick={addFileExamples}>Añadir Documento</Button>
                
                <Form.Group controlId="videoEx" className="mb-3 marginModal">
                    <Form.Label>Añadir video</Form.Label>
                    <Form.Control type="txt" size="sm" placeholder = "ej. https://www.youtube.com/watch?v=example" ref={youtubeVid2}/>
                </Form.Group>
                <Button variant="primary" className = "btnHeight barMargin buttonKeyConcept" onClick={addVideoExamples}>Añadir Video</Button>
                <br></br>
                <Button variant="secondary" className='barMargin marginModal'  onClick={deleteExample}>Eliminar</Button>
                <div className='boxUnits'>
                <ListGroup>
                    {examples.map((resource,i)=><ListGroup.Item action onClick={()=>{setDeleteE(i)}} className='unitItem'  style={{backgroundColor : deleteE == i ?  "#9E9A92" : "transparent"}}>
                        {resource.pdfUrl ? resource.pdfUrl.name : resource.videoUrl}
                    </ListGroup.Item>)}
                </ListGroup>
                </div>
                           
                {/*boton de crear */}
                <hr className="whitetxt"></hr>
                <div className='rightBtn'>
                    <Button className = 'buttonKeyConcept' type="submit">Crear Unidad</Button>
                    
                </div>
                {listEmpty ? <Alert className=' margin-5pc' key={'danger'} variant={'danger'}>
                    Necesita al menos 1 recurso, 1 ejemplo, y un concepto importante para crear la unidad
                </Alert> : <></>}
            </Form>
        </Modal.Body>
      </Modal>);
    }
 
    const KeyConceptWindow =  () =>{
   
        return(<Modal show={conceptModal} onHide={handleCloseConcept} animation={false}>
        <Modal.Header className = "colorMonitorTable whitetxt" closeButton>
          <Modal.Title>Añadir Palabra</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "colorMonitorTable whitetxt">
            <Form noValidate validated={validatedConcept} onSubmit={handleSubmitConcept}>
                <Form.Group controlId="wordText" className="mb-3 marginModal">
                    <Form.Label>Añadir Palabra</Form.Label>
                    <Form.Control required type="text" size="sm" ref={vocabWord} />
                    <Form.Control.Feedback type="invalid" >
                        debe ingresar una palabra
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="defText" className="mb-3 marginModal">
                    <Form.Label>Añadir Definition</Form.Label>
                    <Form.Control required type="text" size="sm" ref={definitionBox} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3 marginModal">
                    <Form.Label>Añadir Imagen</Form.Label>
                    <Form.Control required type="file" size="sm" ref={conceptImage} />
                </Form.Group>
                           
                {/*boton de crear */}
                <hr className="whitetxt"></hr>
                <Button className = 'buttonKeyConcept' type="submit">Añadir concepto</Button>
                {repeatedWord ? <Alert className=' margin-5pc' key={'danger'} variant={'danger'}>
                    La palabra ya esta en la lista
                </Alert> : <></>}
            </Form>
        </Modal.Body>
      </Modal>);
    }

    const CreateExamWindow = () =>{
        return(<Modal show={showExam} onHide={handleCloseExam} animation={false}>
            <Modal.Header className = "colorMonitorTable whitetxt" closeButton>
              <Modal.Title>Crear Examen</Modal.Title>
            </Modal.Header>
            <Modal.Body className = "colorMonitorTable whitetxt">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <div className='boxUnits'>
                        <ListGroup>
                            {examQuestions.map((question, i)=><ListGroup.Item action onClick={()=>{setDeleteQ(i)}} className='unitItem' style={{backgroundColor : deleteQ == i ?  "#9E9A92" : "transparent"}} >
                                Pregunta {i+1} - {question.question}
                            </ListGroup.Item>)}
                        </ListGroup>
                    </div>
                    
                    <hr className="whitetxt"></hr>
                    <Button variant="secondary" className='barMargin margin-5pc'  onClick={deleteQuestion}>Eliminar</Button>
                    

                    <Form.Group as={Row} className="mb-3" controlId="question">
                            <Form.Label className='whitetxt' column sm={3}>
                                Pregunta: 
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control type="text" placeholder="pregunta" ref={pregunta} />
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="op1">
                            <Form.Label className='whitetxt' column sm={3}>
                                Opcion a: 
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control type="text" placeholder="opcion" ref={op1} />
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="op2">
                            <Form.Label className='whitetxt' column sm={3}>
                                Opcion b: 
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control type="text" placeholder="opcion" ref={op2} />
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="op3">
                            <Form.Label className='whitetxt' column sm={3}>
                                Opcion c: 
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control type="text" placeholder="opcion" ref={op3} />
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="op3">
                            <Form.Label className='whitetxt' column sm={3}>
                                Opcion d: 
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control type="text" placeholder="opcion" ref={op4}/>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="op3">
                            <Form.Label className='whitetxt' column sm={3}>
                                Opcion correcta: 
                            </Form.Label>
                            <Col sm={2}>
                            <Form.Control type="number" placeholder="1" ref={respuesta}/>
                            </Col>
                            <Col sm={7}>
                            
                            </Col>
                    </Form.Group>
                    {/*crear pregunta */}
                    <Button variant="primary" className = "btnHeight barMargin buttonKeyConcept" onClick={addQuestion}>Agregar Pregunta</Button>
                
                               
                    {/*boton de crear */}
                    <hr className="whitetxt"></hr>
                    <div className='rightBtn'>
                        <Button className = 'buttonKeyConcept' type="submit" onClick={()=>{setShowExam(false)}}>Crear Examenes</Button>
                    </div>
                </Form>
            </Modal.Body>
          </Modal>);
    }



    const handleSubmitConcept = async (event: React.FormEvent<HTMLFormElement>) => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          
        }
        const existingWord = vocab.find((word) => word.concepto === vocabWord.current?.value);
       await setValidatedConcept(true);
    
        if(!existingWord && validatedConcept && vocabWord.current?.value != "" && definitionBox.current?.value!=""){
            setRepeatedWord(false);
            setVocab([...vocab,{
                concepto: vocabWord.current?.value ? vocabWord.current?.value : "",
                definicion: definitionBox.current?.value ? definitionBox.current?.value  : "",
                img: conceptImage.current?.files && conceptImage.current?.files[0]
            } ])
            //clearing values
            if (vocabWord.current) {
                vocabWord.current.value = ""; 
            }
            if(definitionBox.current){
                definitionBox.current.value = "";
            }
            if(conceptImage.current){
                conceptImage.current.value = "";
            }
           setConceptModal(false);
        }else{
            if(!existingWord && vocabWord.current?.value != ""){
                setRepeatedWord(true);
            }
        }
        
    };

    
  
    const handleSubmit = async (event : any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          
        } 
        await setValidated(true);
        if(vocab.length == 0 || resources.length == 0 || examples.length == 0){
            setListEmpty(true);
        } else if(validated){
     
            setListEmpty(false);
            if(num == -1){
                setUnits([...units, {
                    name : unitName,
                    number : units.length+1,
                    conceptosClave : vocab,
                    recursos : resources,
                    examples : examples                
                }])
                setVocab([]);
                setResources([]);
                setExamples([]);
                setNum(-1);
                setShow(false);
            }else{
                
                const list = units.filter(unit => unit.number != num);
                list.push({
                    name : unitName,
                    number : num,
                    conceptosClave : vocab,
                    recursos : resources,
                    examples : examples                
                })
                setUnits(list.sort((a, b) => a.number - b.number))
                setUnitName("");
                setVocab([]);
                setResources([]);
                setExamples([]);
                setNum(-1);
                setShow(false);
            }
        }
    };

    const sendToBackend = () =>{

    }

    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
      };
    
    
    return(<>
        <div className="container">
            <div className="containerCreate">
                <h1 className="whitetxt titleCreate"><b>Cree un Nuevo Curso</b></h1>
                <hr className="whitetxt"></hr>

                <h3 className='whitetxt'>Datos generales</h3>

                {/*peticion de datos*/}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="courseName">
                            <Form.Label required className='whitetxt' column sm={3}>
                                Nombre del curso: 
                            </Form.Label>
                            
                            <Col sm={9}>
                            <Form.Control required type="text" placeholder="Nombre de curso" ref={courseName} />
                            </Col>
                    </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDesc">
                        <Form.Label className='whitetxt' column sm={3}>
                            Descripción: 
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control required type="textarea" placeholder="Descripcion del curso" ref={description} />
                        </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label className='whitetxt' column sm={3}>
                            Imagen del curso: 
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control required type="file" placeholder="Descripcion del curso" ref={image} />
                        </Col>
                </Form.Group>

                <hr className="whitetxt"></hr>
                <h3 className='whitetxt'>Unidades</h3>
                <Button variant="primary" className = "btnHeight barMargin buttonAddUnit" onClick={handleShow}>Añadir unidad +</Button>
                {UnitWindow()}
                <div className='boxUnits'>
                <ListGroup>
                    {units.map((item,i)=><ListGroup.Item  key = {item.number} action onClick={()=>{ modifyUnit(i+1)}} className='unitItem' style={{backgroundColor : num == (i+1) ?  "#9E9A92" : "transparent"}} >
                        Unidad {i+1} - {item.name}
                    </ListGroup.Item>)}
                </ListGroup>
                </div>

                {/*evaluacion */}
                <hr className="whitetxt"></hr>
                <h3 className='whitetxt'>Evaluación</h3>
                <Button variant="primary" className = "btnHeight barMargin buttonCreate widthExam" onClick={handleOpenExam }>Crear Examen</Button>
                    {CreateExamWindow()}
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label className='whitetxt' column sm={4}>
                                Calaficación de aprobación: 
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control required type="number" placeholder="00" />
                            </Col>
                            
                            <Form.Label className='whitetxt' column sm={1}>
                                %
                            </Form.Label>
                            
                            <Col sm = {5}></Col>
                    </Form.Group>
                
                <hr className="whitetxt"></hr>
                    {/*boton de crear */}
                <div className='rightBtn'>
                    <Button type="submit"  className = "btnHeight barMargin buttonCreate widthExam" >Crear Curso</Button>
                </div>
                </Form>
            </div>
        </div>
    </>);
}