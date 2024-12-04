import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useEffect, useState } from 'react';
import UnitInfo from './CourseSubscreens/unitinfo';

import FlashCardScreen from './CourseSubscreens/flashcardscreen';
import { SummaryWindow } from './CourseSubscreens/summaries';
import Questions from './CourseSubscreens/questions';
import Exams from './CourseSubscreens/exams';
import axios from 'axios';
import {courseInfo} from "@/data/data"
export default function Curso(){
    interface infoUnit{
        unitNumber: number,
        idCourse : string,
        name: string,
        _id: string,
    }
    const [units, setUnits] = useState<infoUnit[]>([])
    const [menu, setMenu] = useState(0);
    const [unit, setUnit] = useState<infoUnit>();
    const [loaded, setLoaded] = useState(false)
    const onClick1 = () =>{
        setMenu(1)
    }
    const onClick2 = () =>{
        setMenu(2);
    }
    
    const onClick3 = () =>{
        setMenu(3)
    }
    const onClick4 = () =>{
        setMenu(4)
    }
    const onClick5 = () =>{
        setMenu(5)
    }
    {/*menu options*/}
    const changeUnit = (menuNum: number, unitNum: number, unitName : string, unitId : string) =>{
        const item = localStorage.getItem("currentCourse")
        
        setMenu(menuNum)
        setUnit({
            unitNumber: unitNum,
            name: unitName,
            _id: unitId,
            idCourse: item? item : "",
        })
    }
    const menuOptions = () =>{
        if(menu == 1){
            return(<Exams></Exams>);
        }
        if(menu == 2){
            console.log(unit?._id)
            return(
                
                <UnitInfo courseID = {unit ? unit?.idCourse : ""} name = {unit ? unit?.name : ""} _id = {unit? unit?._id : ""}  unitNum={unit?.unitNumber ?unit.unitNumber : 0}></UnitInfo>
            );
            
        }else if(menu == 3){
            return(<Questions></Questions>);
        }else if(menu == 4){
            return(<FlashCardScreen></FlashCardScreen>);

        }else if(menu == 5){
            return(<SummaryWindow></SummaryWindow>);
        }
    }


    /*load cursos */
    const load = () =>{
        let url = "http://localhost:3001/getUnits";
        const item = localStorage.getItem("currentCourse")
        const body={
            courseId : item ? item : ""
        }
        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*'
            }
        }
        axios.post(url, body, config).then((res)=>{
            const newUnits = res.data.units.map((unit : any)=>({
                unitNumber: unit.number,
                idCourse: unit.course_id,
                name: unit.name,
                _id: unit._id
            }))
            localStorage.setItem("currentUnits",  JSON.stringify(newUnits))
            setUnits(newUnits.sort((a:any, b:any) => (a.unitNumber < b.unitNumber ? -1 : 1)));
        }).catch((error)=>{console.log(error)})
    }

    useEffect(()=>{
        load();
        setTimeout(() => {setLoaded(true)}, 3000);
    }, [])
    
    return(<>
        
        <div className='flex'>
            <Sidebar className='height-100 min-height-100 lightbg'>
                <div className='topTag'>
                    <img width= '50px' height='50px' src = "./imagenes/icono.png"></img>
                    <p>SmartLearn</p>
                </div>
                <Menu>
                    <MenuItem onClick={onClick1} icon = {<img width= '24px' height='24px' src = "./imagenes/course_exam_icon.png"></img>}>
                        Evalaucion
                    </MenuItem>

                     {/* Unidades */}
                    <SubMenu label="Unidades" icon = {<img width= '24px' height='24px' src = "./imagenes/course_menu_icon.png"></img>}>
                        {units.map((unit)=><MenuItem onClick={()=>{changeUnit(2, unit.unitNumber, unit.name, unit._id)}} icon = {<img width= '24px' height='24px' src = "./imagenes/course_arrow_icon.png"></img>}>
                            Unidad {unit.unitNumber}
                        </MenuItem>)}
                        
                    </SubMenu>

                    {/* Recursos */}
                    <SubMenu label="Recursos" icon = {<img width= '24px' height='24px' src = "./imagenes/course_menu_icon.png"></img>}>
                        <MenuItem onClick={onClick3} icon = {<img width= '24px' height='24px' src = "./imagenes/recursos_icon.png"></img>}>
                            Preguntas
                        </MenuItem>
                        <MenuItem onClick={onClick4} icon = {<img width= '24px' height='24px' src = "./imagenes/recursos_icon.png"></img>}>
                            Flash Cards
                        </MenuItem>
                        <MenuItem onClick={onClick5} icon = {<img width= '24px' height='24px' src = "./imagenes/recursos_icon.png"></img>}>
                            Resumen
                        </MenuItem>
                    </SubMenu>
                    
                    
                </Menu>
            </Sidebar>
            <div className = 'container'>
                {menuOptions()}
            </div>
            
        </div>
    </>);
    
}