import React, {useState} from 'react'
import {Link} from 'react-router-dom'; 
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import {SideMenuData} from './SideMenuData';
import './SideMenu.css';
import {IconContext} from 'react-icons'

function SideMenu(){
    const [sidebar, setSidebar] = useState(false);

    const mostrarSidebar = () => setSidebar(!sidebar);

    return(
        <>
        <IconContext.Provider value = {{color: '#fff'}}>
            <div className = 'navbar'>
                <Link to = '#' className = 'menu-bars'>
                    <FaIcons.FaBars onClick={mostrarSidebar} />
                </Link>
            </div>
            <nav className = { sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className = 'nav-menu-items' onClick = {mostrarSidebar}>
                    <li className = 'navbar-toggle'>
                        <Link to = '#' className = 'menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>     
                   </li>
                   {SideMenuData.map((item, index) =>{
                      return(
                          <li key = {index} className ={item.cName}>
                              <Link to = {item.path}>
                                  {item.icon}
                                  <span>
                                      {item.title}
                                  </span>
                              </Link>
                          </li>
                      ) 
                   })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}


export default SideMenu;