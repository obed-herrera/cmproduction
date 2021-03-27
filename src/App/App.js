import React from "react";
import "./App.css";
import SideMenu from "../components/SideMenu";
import {CssBaseline, makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core';
import Header from "../components/Header";
import Home from '../pages/Home/Home';
import Client from '../pages/Clients/Client';
import Loan from '../pages/Loans/Loan';
import Login from '../pages/Login/Login';
import Employee from "../pages/Employees/Employee";
import Configuration from "../pages/Configuration/Configuration";
import CreateUser from "../pages/Configuration/CreateUser";
import CreateLine from "../pages/Configuration/CreateLine";
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

class App extends React.Component{
  state={
    isLog:false
  }

  handleLogin = (isLog) => this.setState({isLog})
  render(){
    const {isLog} = this.state;
    return(
      <ThemeProvider theme = {theme}>
        <Router>
        
          <Switch>
            {
              !isLog ?
              <Route exact path = '/' render = {() =><Login isLogin = {this.handleLogin}/>}/>
              :
              <Route path = '/' render={()=><Home/>}/>
            }
          <div>
          {/*<SideMenu/>
            <Route path = '/employee' component = {Employee}/>
            <Route path = '/client' component = {Client}/>
            <Route exact path = "/home" component = {Home}/>
            <Route path = '/loan' component = {Loan}/>
            <Route path = '/configuration' component = {Configuration}/>
            <Route path = '/createuser' component = {CreateUser}/>  
          <Route path = '/createline' component = {CreateLine}/> */}  
          </div>
              
          </Switch>
          
        </Router>
      <CssBaseline />
      </ThemeProvider>
    );
  }
  
}

export default App;
