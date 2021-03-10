import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import {Grid, TextField, makeStyles} from '@material-ui/core';
import  MultipleSelect from "../../controls/MultipleSelect";
import * as clientServices from '../../services/clientServices';
import "./ClientStyles.css";
import {useForm, Form} from '../../components/useForm';
import SideMenu from "../../components/SideMenu";


const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const clientState = [
    {id: 'activo', title: 'Activo'},
    {id: 'inactivo', title: 'Inactivo'},
]

function Client() {
  const baseUrl="http://localhost/crediapi/client.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [clientSeleccionado, setClientSeleccionado]=useState({
    id_credi_client: '',
    client_first_name: '',
    client_second_name: '',
    client_middle_name: '',
    client_last_name: '',
    client_national_id: '',
    client_sys_code: '',
    client_home_address: '',
    client_business_address: '',
    client_state: '',
    client_line: '',
    client_phone: '',
    client_creation_date: new Date()
  });


  const handleChange=e=>{
    const {name, value}=e.target;
    setClientSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(clientSeleccionado);
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
    f.append("client_first_name", clientSeleccionado.client_first_name);
    f.append("client_second_name", clientSeleccionado.client_second_name);
    f.append("client_middle_name", clientSeleccionado.client_middle_name);
    f.append("client_last_name", clientSeleccionado.client_last_name);
    f.append("client_national_id", clientSeleccionado.client_national_id);
    f.append("client_sys_code", clientSeleccionado.client_sys_code);
    f.append("client_home_address", clientSeleccionado.client_home_address);
    f.append("client_business_address", clientSeleccionado.client_business_address);
    f.append("client_state", clientSeleccionado.client_state);
    f.append("client_line", clientSeleccionado.client_line);
    f.append("client_phone", clientSeleccionado.client_phone);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  /*const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", clientSeleccionado.nombre);
    f.append("lanzamiento", clientSeleccionado.lanzamiento);
    f.append("desarrollador", clientSeleccionado.desarrollador);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: frameworkSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(framework=>{
        if(framework.id===frameworkSeleccionado.id){
          framework.nombre=frameworkSeleccionado.nombre;
          framework.lanzamiento=frameworkSeleccionado.lanzamiento;
          framework.desarrollador=frameworkSeleccionado.desarrollador;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }*/

  /*const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: frameworkSeleccionado.id}})
    .then(response=>{
      setData(data.filter(framework=>framework.id!==frameworkSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }*/

  const seleccionarClient=(client, caso)=>{
    setClientSeleccionado(client);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Primer Nombre</th>
          <th>Primer Apellido</th>
          <th>Cedula del Cliente</th>
          <th>Direccion de casa</th>
          <th>Linea</th>
          <th>Fecha de creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((client, index)=>(
          <tr key={index}>
            <td>{client.id_credi_client}</td>
            <td>{client.client_first_name}</td>
            <td>{client.client_middle_name}</td>
            <td>{client.client_national_id}</td>
            <td>{client.client_home_address}</td>
            <td>{client.client_line}</td>
            <td>{client.client_creation_date}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarClient(client, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarClient(client, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar} contentClassName = "custom-modal-style">
      <ModalHeader>Insertar Cliente</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>
                            <span>Primer Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_second_name" onChange = {handleChange}/>
                            <span>Segundo Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_middle_name" onChange = {handleChange}/>
                            <span>Primer Apellido</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_last_name" onChange = {handleChange}/>
                            <span>Segundo Apellido</span> 
                        </label>
                        <br/>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_national_id" onChange = {handleChange}/>
                            <span>Cedula del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_sys_code" onChange = {handleChange}/>
                            <span>Codigo del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_home_address" onChange = {handleChange}/>
                            <span>Direccion de casa</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_business_address" onChange = {handleChange}/>
                            <span>Direccion de negocio</span> 
                        </label>
                        <br/>
                    </div>                                    
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_phone" onChange = {handleChange}/>
                      <span>Telefono del Cliente</span> 
                    </label>
                    <br/>
                    <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_state" onChange = {handleChange}/>
                      <span>Estado del Cliente</span> 
                    </label>
                    <br/>
                    <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_line" onChange = {handleChange}/>
                      <span>Linea del Cliente</span> 
                    </label>
                    <br/>
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
      <ModalHeader>Insertar Cliente</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>
                            <span>Primer Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_second_name" onChange = {handleChange}/>
                            <span>Segundo Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_middle_name" onChange = {handleChange}/>
                            <span>Primer Apellido</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_last_name" onChange = {handleChange}/>
                            <span>Segundo Apellido</span> 
                        </label>
                        <br/>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_national_id" onChange = {handleChange}/>
                            <span>Cedula del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_sys_code" onChange = {handleChange}/>
                            <span>Codigo del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_home_address" onChange = {handleChange}/>
                            <span>Direccion de casa</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_business_address" onChange = {handleChange}/>
                            <span>Direccion de negocio</span> 
                        </label>
                        <br/>
                    </div>                                    
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_phone" onChange = {handleChange}/>
                      <span>Telefono del Cliente</span> 
                    </label>
                    <br/>
                    <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_state" onChange = {handleChange}/>
                      <span>Estado del Cliente</span> 
                    </label>
                    <br/>
                    <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_line" onChange = {handleChange}/>
                      <span>Linea del Cliente</span> 
                    </label>
                    <br/>
                  </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    </div>
  );
}

export default Client;