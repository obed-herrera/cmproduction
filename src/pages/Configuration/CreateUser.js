import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import {Grid, makeStyles} from '@material-ui/core';
import Controls from "../../controls/Controls";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import "./CreateUserStyles.css";
import md5 from 'md5';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CreateUser() {

  const baseUrl="https://credimarketnic.com/crediapi/user.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [userSeleccionado, setUserSeleccionado]=useState({
    id_credi_user: '',
    username: '',
    credi_password: '',
    user_role: '',
    user_state: ''
  });

  const [state, setState]=useState([]);

  const classes = useStyles();

  const handleChange=e=>{
    const {name, value}=e.target;
    setUserSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(userSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("username", userSeleccionado.username);
    f.append("credi_password", md5(userSeleccionado.credi_password));
    f.append("user_role", userSeleccionado.user_role);
    f.append("user_state", userSeleccionado.user_state);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("username", userSeleccionado.username);
    f.append("credi_password", userSeleccionado.credi_password);
    f.append("user_role", userSeleccionado.user_role);
    f.append("user_state", userSeleccionado.user_state);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: userSeleccionado.id_credi_user}})
    .then(response=>{
      var dataNueva= data;
      dataNueva && dataNueva.map(user=>{
        if(user.id_credi_user===userSeleccionado.id_credi_user){
          user.username=userSeleccionado.username;
          user.credi_password=md5(userSeleccionado.credi_password);
          user.user_role=userSeleccionado.user_role;
          user.user_state=userSeleccionado.user_state;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id_credi_user: userSeleccionado.id_credi_user}})
    .then(response=>{
      setData(data.filter(user=>user.id_credi_user!==userSeleccionado.id_credi_user));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarUser=(user, caso)=>{
    setUserSeleccionado(user);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
   <div>
       <div style={{textAlign: 'center'}}>
    <br />
      <Controls.Button
                        /*type = "submit"*/
                        text = "Insertar Usuario"
                        color = "default"
                        onClick = {()=>abrirCerrarModalInsertar()}
                    />
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Usuario</th>
            <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((user, index)=>(
          <tr key={index}>
            <td>{user.username}</td>
            <td>{user.user_role}</td>
          <td>
          <Controls.Button
                        type = "submit"
                        text = "Editar"
                        onClick = {()=>seleccionarUser(user, "Editar")}
                    /> {"  "}
          <Controls.Button
                        text = "Eliminar"
                        color = "default"
                        onClick = {()=>seleccionarUser(user, "Eliminar")}
                    />
          </td>
          </tr>
        ))}
      </tbody> 
    </table>
    <Modal isOpen={modalInsertar} contentClassName = "custom-modal-style">
      <ModalHeader>Insertar Usuario</ModalHeader>
      <ModalBody>
            <Grid container spacing = {1} style = {{padding:20}}>
                <Grid item xs ={25}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                        <input placeholder= " " type = "text" className = "form-control" name = "username" onChange = {handleChange}/>
                            <span>Usuario</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                        <input placeholder= " " type = "text" className = "form-control" name = "password" onChange = {handleChange}/>
                            <span>Constraseña</span> 
                        </label>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={state.user_Role}
                                name="user_role"
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'user_role' }}
                            >
                                <option value="" disabled>
                                Rol del Usuario
                                </option>
                                <option value={'Usuario Estandar'}>Usuario Estandar</option>
                                <option value={'Super Administrador'}>Super Administrador</option>
                            </NativeSelect>
                      <FormHelperText>Rol del Usuario</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={state.user_State}
                                name="user_state"
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'user_state' }}
                            >
                                <option value="" disabled>
                                Estado del Usuario
                                </option>
                                <option value={'Activo'}>Activo</option>
                                <option value={'Inactivo'}>Inactivo</option>
                            </NativeSelect>
                      <FormHelperText>Estado del Usuario</FormHelperText>
                    </FormControl>
                    </div>
                </Grid>
            </Grid>  
      </ModalBody>
        <ModalFooter>
                <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
    </Modal>
    <Modal isOpen={modalEditar} contentClassName = "custom-modal-style">
    <ModalHeader>Editar Usuario</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "username" onChange = {handleChange}/>
                            <span>Usuario</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "password" onChange = {handleChange}/>
                            <span>Constraseña</span> 
                        </label>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={state.user_Role}
                                name="user_role"
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'user_role' }}
                            >
                                <option value="" disabled>
                                Rol del Usuario
                                </option>
                                <option value={'Usuario Estandar'}>Usuario Estandar</option>
                                <option value={'Super Administrador'}>Super Administrador</option>
                            </NativeSelect>
                      <FormHelperText>Linea del Cliente</FormHelperText>
                    </FormControl>
                    </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" type = "submit">Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Usuario {userSeleccionado && userSeleccionado.username}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
   </div>
  )
};

export default CreateUser
