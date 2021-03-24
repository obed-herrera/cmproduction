/*import React, {useState, useEffect, Component, setState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="">
          CrediMarketDev
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  export default function Login() {
    const classes = useStyles();
    const state = {
      form:{
        username:'',
        credi_password:''
      }
    }

    const baseUrl="http://localhost/crediapi/login.php";
    const cookies = new Cookies();
    const [userSeleccionado, setUserSeleccionado] = useState([]);


    const iniciarSesion = async()=>{
      await axios.get(baseUrl, {param: {username: this.state.form.username, credi_password: md5(this.state.form.credi_password)}})
      .then(response=>{
        return response.data;
      })
      .then(response=>{
        if(response.length>0){
          var respuesta=response[0];
          cookies.set('id'. respuesta.id_credi_user, {path:"/"});
          cookies.set('username'. respuesta.username, {path:"/"});
          cookies.set('user_role'. respuesta.user_role, {path:"/"});
          cookies.set('user_state'. respuesta.user_state, {path:"/"});
          alert(`Bienvenido ${respuesta.username}`);
          window.location.href="./home";
        }else{
          alert('El usuario o la contraseña son incorrectos');
        }
      })
      .catch(error=>{
        console.log(error);
      })
    }
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario"
                name="username"
                autoComplete="usuario"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="credi_password"
                label="Constraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Link to = '/home'>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>iniciarSesion()}
              >
                  Ingresar
              </Button>
              </Link>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }*/

  import React, {Component} from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import axios from 'axios';
  import md5 from 'md5';
  import Cookies from 'universal-cookie';
  import "./Login.css";

  const baseUrl="http://localhost/crediapi/login,php";
  const cookies = new Cookies();

  class Login extends Component{
    state={
      form: {
        username:'',
        credi_password: ''
      }
    }

    handleChange=async e=>{
      await this.setState({
        form:{
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      });
    }

    iniciarSesion=async()=>{
      await axios.get(baseUrl, {params: {username: this.state.form.username, credi_password: md5(this.state.form.credi_password)}})
      .then(response=>{
          return response.data;
      })
      .then(response=>{
          if(response.length>0){
              var respuesta=response[0];
              cookies.set('username', respuesta.username, {path: "/"});
              alert(`Bienvenido ${respuesta.username}`);
              window.location.href="./home";
          }else{
              alert('El usuario o la contraseña no son correctos');
          }
      })
      .catch(error=>{
          console.log(error);
      })

  }

  componentDidMount() {
    if(cookies.get('username')){
        window.location.href="./home";
    }
}


    render(){
      return(
        <div className = "containerPrincipal">
          <div className = "containerSecundario">
          <div className = "form-group">
            <label>Usuario: </label>
            <br/>
            <input
              type = "text"
              className = "form-control"
              name = "username"
              onChange = {this.handleChange}
            />
            <label>Contraseña: </label>
            <br/>
            <input
              type = "password"
              className = "form-control"
              name = "credi_password"
              onChange= {this.handleChange}
            />
            <br/>
            <button className = "btn btn-primary" onClick = {()=>this.iniciarSesion()}>Iniciar Sesion</button>
          </div>
          </div>
        </div>
      );
    }
  }

  export default Login