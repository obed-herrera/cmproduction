import React from "react";
import "./App.css";
import SideMenu from "../components/SideMenu";
import {CssBaseline, makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core';
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Home from '../pages/Home/Home';
import Client from '../pages/Clients/Client';
import Loan from '../pages/Loans/Loan';
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
      <Header />
      <Router>
        <SideMenu />
        <Switch>
          <Route path = '/employee' component = {Employee}/>
          <Route path = '/client' component = {Client}/>
          <Route path = '/home' component = {Home}/>
          <Route path = '/loan' component = {Loan}/>
        </Switch>
      </Router>
    <div className = {classes.appMain}>    
    </div>
    <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
