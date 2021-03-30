import { makeStyles } from '@material-ui/core';
import React from 'react';
import './Login.css';

class Login extends React.Component{
    state={
        username:'',
        credi_password:''
    }

    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.isLogin(true)
    }

    render(){
        return(
            <div className = 'div-login'>
                <form onSubmit = {this.handleSubmit}>
                    <input type = 'text' name = 'username' placeholder = 'Usuario' required onChange = {this.handleChange}/>
                    <input type = 'password' name = 'credi_password' placeholder = 'Contrasena' required onChange = {this.handleChange}/>\
                    <button className = 'button-login' type = 'submit'>Iniciar Sesion</button>
                </form>
            </div>
        );
    }
}



export default Login;