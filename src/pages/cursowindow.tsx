import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from 'react';
import UnitInfo from './CourseSubscreens/unitinfo';

import {variables} from '@/data/data'
export default function Curso(){



    
    {/*menu control */}
    const [menu, setMenu] = useState(2);
    const [unit, setUnit] = useState(0);
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
    const changeUnit = (menuNum: number, unitNum: number) =>{
        setMenu(menuNum)
        setUnit(unitNum)
    }
    const menuOptions = () =>{
        if(menu == 1){
            return(
            <></>
            );
        }
        if(menu == 2){
            return(
                <UnitInfo courseID = {1}  unitID={1}></UnitInfo>
            );
            
        }
    }
    return(<>
        <div className='flex'>
            <Sidebar className='autoheight lightbg'>
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
                        <MenuItem onClick={()=>{changeUnit(2, 1)}} icon = {<img width= '24px' height='24px' src = "./imagenes/course_arrow_icon.png"></img>}>
                            Unidad 1
                        </MenuItem>
                    </SubMenu>

                    {/* Recursos */}
                    <SubMenu label="Recursos" icon = {<img width= '24px' height='24px' src = "./imagenes/course_menu_icon.png"></img>}>
                        <MenuItem onClick={onClick3} icon = {<img width= '24px' height='24px' src = "./imagenes/recursos_icon.png"></img>}>
                            Preguntas
                        </MenuItem>
                        <MenuItem onClick={onClick4} icon = {<img width= '24px' height='24px' src = "./imagenes/recursos_icon.png"></img>}>
                            Vocabulario
                        </MenuItem>
                        <MenuItem onClick={onClick5} icon = {<img width= '24px' height='24px' src = "./imagenes/recursos_icon.png"></img>}>
                            Resumen
                        </MenuItem>
                    </SubMenu>
                    
                    
                </Menu>
            </Sidebar>
            {menuOptions()}
            
        </div>
    </>);
}