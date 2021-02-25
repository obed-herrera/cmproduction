import React, {useState} from 'react'
import {withStyles} from '@material-ui/core';
import {BrowserRouter as Link} from 'react-router-dom'; 
import * as AiIcons from 'react-icons/ai';
import MenuIcon from '@material-ui/icons/Menu';
import {SideMenuData} from './SideMenuData';
import './SideMenu.css';

function SideMenu(){
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return(
        <>
            <div className = "sidebar">
                <Link to = "#" className = 'menu-bars'>
                    <MenuIcon onClick = {showSidebar}/>
                </Link>
            </div>
            <nav className = { sidebar ? 'nav-menu active' : "nav-menu"}>
                <ul className = 'nav-menu-items'>
                    <li className = "navbar-toggle">
                        <Link to = "#" className = 'menu-bars'>
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
        </>
    )
}


export default SideMenu;