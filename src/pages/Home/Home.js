import React from 'react'
import SideMenu from '../../components/SideMenu';
import {Switch, Route} from 'react-router-dom';
import Client from '../Clients/Client';
import Employee from "../Employees/Employee";
import Configuration from "../Configuration/Configuration";
import CreateUser from "../Configuration/CreateUser";
import CreateLine from "../Configuration/CreateLine";
import Loan from '../Loans/Loan';
import {NavLink, Link} from 'react-router-dom';

const Home = () =>{
    return(
        <div>
            <SideMenu/>
            <Switch>
                <Route path = '/client' component = {Client}/>
                <Route path = '/employee' component = {Employee}/>
                <Route path = '/loan' component = {Loan}/>
                <Route path = '/configuration' component = {Configuration}/>
                <Route path = '/createuser' component = {CreateUser}/>  
                <Route path = '/createline' component = {CreateLine}/>
            </Switch>
        </div>
    )
}

export default Home;