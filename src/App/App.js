import React from "react";
import "./App.css";
import SideMenu from "../components/SideMenu";
import {CssBaseline, makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core';
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Client from '../pages/Clients/Client';
import Employee from "../pages/Employees/Employee";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const theme = createMuiTheme({
  palette:{
    primary:{
      main: "#333996",
      light: '#3c44b126'
    },
    secondary:{
      main: "#f83245",
      light:  '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform: 'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple: true
    }
  }
})

const useStyles = makeStyles({
  appMain:{
    paddingLeft: '320px',
    width:'100%'
  },
  
 
})



function App(){
  const classes = useStyles();
  return(
    <ThemeProvider theme = {theme}>
      <Router>
        <SideMenu />
        <Switch>
          <Route path = '/employee' component = {Employee}/>
          <Route path = '/clients' component = {Client}/>
        </Switch>
      </Router>
    <div className = {classes.appMain}>
      <Header />
      <Employee />    
    </div>
    <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
