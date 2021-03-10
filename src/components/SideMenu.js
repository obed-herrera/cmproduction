import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SideMenuData } from './SideMenuData';
import { IconContext } from 'react-icons/lib';
import SubMenu from './SubMenu';
import {AppBar, Toolbar, makeStyles, Grid, IconButton, Typography} from '@material-ui/core'
import Today from '@material-ui/icons/Today';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const Nav = styled.div`
  background: #62BA75;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #62BA75;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const NavText = styled.div`
  float: none;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NavPowerIcon = styled.div`
  float: none;
  position: absolute;
  top: 5%;
  left: 94%;
  transform: translate(-50%, -50%);
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SideMenu = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />   
          </NavIcon>
          <NavText>
            <Typography variant = "h4" color = "textPrimary">CrediMarket</Typography>
          </NavText>
          <NavPowerIcon>
          <Grid item>
            <Link to = '/login'>
              <IconButton >
                <PowerSettingsNewIcon  />
              </IconButton>
            </Link>
          </Grid>
          </NavPowerIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SideMenuData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default SideMenu;