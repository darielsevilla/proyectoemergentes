import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from 'react';
import Footerc from '@/pages/footer';
import Link from "next/link"
import CreatedCourses from './jefecursos';
import Perfil from '../perfil';
import Monitor from './monitor';

export default function VentanaJefe(){
    const [menu, setMenu] = useState(2);
    const onClick1 = () =>{
        setMenu(1);
        
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

    const menuChoice = () =>{
        if(menu == 1){
            return(<Perfil></Perfil>);
        }else if(menu == 2){
            return(<CreatedCourses></CreatedCourses>);  
        }else if(menu == 5){
            return(<Monitor></Monitor>); 
        }else{
            return(<></>);  
        }
             
    }
    return(<>
        <div className='flex'>
            <Sidebar className='height-100 lightbg min-height-100'>
                <div className='topTag'>
                    <img width= '50px' height='50px' src = "/imagenes/icono.png"></img>
                    <p>SmartLearn</p>
                </div>
                <Menu>
                    <MenuItem onClick={onClick1} icon = {<img width= '24px' height='24px' src = "/imagenes/perfil_icon.png"></img>}>
                        Mi Perfil
                    </MenuItem>
                    <MenuItem onClick={onClick2} icon = {<img width= '24px' height='24px' src = "/imagenes/curso_icon.png"></img>}>
                        Mis Cursos
                    </MenuItem>
                    <MenuItem onClick={onClick3} icon = {<img width= '24px' height='24px' src = "/imagenes/resources_icon.png"></img>}>
                        Mis Recursos
                    </MenuItem>
                    <MenuItem onClick={onClick4} icon = {<img width= '24px' height='24px' src = "/imagenes/more_icon.png"></img>}>
                        Publicar Recursos
                    </MenuItem>
                    <MenuItem onClick={onClick5} icon = {<img width= '24px' height='24px' src = "/imagenes/monitor_icon.png"></img>}>
                        Monitoreo
                    </MenuItem>
                    
                </Menu>
            </Sidebar>
            <div className='container'>
                {menuChoice()} 
            </div>
        </div>   
        <Footerc></Footerc>        
        </>
    );
}