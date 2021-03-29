import React, {useState, useEffect, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import {Grid, TextField, makeStyles, emphasize} from '@material-ui/core';
import  MultipleSelect from "../../controls/MultipleSelect";
import * as clientServices from '../../services/clientServices';
import "./ClientStyles.css";
import {useForm, Form} from '../../components/useForm';
import SideMenu from "../../components/SideMenu";
import { AirlineSeatIndividualSuite } from '@material-ui/icons';
import AsyncSelect from 'react-select/async';
import Controls from "../../controls/Controls";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MaterialTable from 'material-table';
import {getLines} from '../../Requests';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const clientState = [
    {id: 'activo', title: 'Activo'},
    {id: 'inactivo', title: 'Inactivo'},
]

function Client() {


  const baseUrl="http://localhost/crediapi/client.php";
  const baseUrl2="http://localhost/crediapi/line.php";
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

  const [line, setLines] = useState([]);
  const [errorRequest, setErrorRequest] = useState(false);
  const {register, watch} = useForm();

  useEffect(() => {
		async function fetchInitialData() {
			const response = await getLines();
			response.errors ? setErrorRequest(true) : setLines(response);
		}

		fetchInitialData();
	}, []);

  const [q, setQ] = useState("");

  const classes = useStyles();
  const [state, setState] = React.useState({
    client_line: '',
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

  const peticionPut=async()=>{
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
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: clientSeleccionado.id_credi_client}})
    .then(response=>{
      var dataNueva= data;
      dataNueva && dataNueva.map(client=>{
        if(client.id_credi_client===clientSeleccionado.id_credi_client){
          client.client_first_name=clientSeleccionado.client_first_name;
          client.client_second_name=clientSeleccionado.client_second_name;
          client.client_middle_name=clientSeleccionado.client_middle_name;
          client.client_last_name=clientSeleccionado.client_last_name;
          client.client_national_id=clientSeleccionado.client_national_id;
          client.client_sys_code=clientSeleccionado.client_sys_code;
          client.client_home_address=clientSeleccionado.client_home_address;
          client.client_business_address=clientSeleccionado.client_business_address;
          client.client_state=clientSeleccionado.client_state;
          client.client_line=clientSeleccionado.client_line;
          client.client_phone=clientSeleccionado.client_phone;
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
    await axios.post(baseUrl, f, {params: {id_credi_client: clientSeleccionado.id_credi_client}})
    .then(response=>{
      setData(data.filter(client=>client.id_credi_client!==clientSeleccionado.id_credi_client));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

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
      <Controls.Button
                        /*type = "submit"*/
                        text = "Insertar Cliente"
                        color = "default"
                        onClick = {()=>abrirCerrarModalInsertar()}
                    />
      {/*<button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar Cliente</button>*/}
      <br /><br />
    <div>
    {/*<input class="form-control"  value="btn-search" onChange={() => this.filter()}/>*/}
    </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Codigo del Cliente</th>
          <th>Primer Nombre</th>
          <th>Primer Apellido</th>
          <th>Cedula del Cliente</th>
          <th>Direccion de casa</th>
          <th>Linea</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((client, index)=>(
          <tr key={index}>
            <td>{client.client_sys_code}</td>
            <td>{client.client_first_name}</td>
            <td>{client.client_middle_name}</td>
            <td>{client.client_national_id}</td>
            <td>{client.client_home_address}</td>
            <td>{client.client_line}</td>
          <td>
          <Controls.Button
                        type = "submit"
                        text = "Editar"
                        /*color = "default"*/
                        onClick = {()=>seleccionarClient(client, "Editar")}
                    /> {"  "}
          <Controls.Button
                        text = "Eliminar"
                        color = "default"
                        onClick = {()=>seleccionarClient(client, "Eliminar")}
                    />
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar} contentClassName = "custom-modal-style-client">
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
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.client_state}
                        name="client_state"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'client_state' }}
                      >
                        <option value="" disabled>
                          Estado del Cliente
                        </option>
                        <option value={'Activo'}>Activo</option>
                        <option value={'Inactivo'}>Inactivo</option>
                      </NativeSelect>
                      <FormHelperText>Estado del Trabajador</FormHelperText>
                    </FormControl>
                      <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={state.client_Line}
                              name="client_line"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'client_line' }}
                            >
                              <option value="" disabled>
                                Linea del Cliente
                              </option>
                              {line.map((value)=>(
                                <option value = {value.client_line} key = {value.id_credi_client_line}>
                                  {value.client_line}
                                </option>
                              ))}
                              
                            </NativeSelect>
                            <FormHelperText>Linea del Cliente</FormHelperText>
                          </FormControl>
                      </div>
                  </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalEditar} contentClassName = "custom-modal-style-client">
      <ModalHeader>Insertar Cliente</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_first_name}/>
                            <span>Primer Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_second_name" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_second_name}/>
                            <span>Segundo Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_middle_name" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_middle_name}/>
                            <span>Primer Apellido</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_last_name" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_last_name}/>
                            <span>Segundo Apellido</span> 
                        </label>
                        <br/>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_national_id" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_national_id}/>
                            <span>Cedula del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_sys_code" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_sys_code}/>
                            <span>Codigo del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_home_address" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_home_address}/>
                            <span>Direccion de casa</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_business_address" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_business_address}/>
                            <span>Direccion de negocio</span> 
                        </label>
                        <br/>
                    </div>                                    
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_phone" onChange = {handleChange} value = {clientSeleccionado && clientSeleccionado.client_phone}/>
                      <span>Telefono del Cliente</span> 
                    </label>
                    <br/>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.client_state}
                        name="client_state"
                        onChange={handleChange} 
                        inputProps={{ 'aria-label': 'client_state' }}
                      >
                        <option value="" disabled>
                          Estado del Cliente
                        </option>
                        <option value={'Activo'}>Activo</option>
                        <option value={'Inactivo'}>Inactivo</option>
                      </NativeSelect>
                      <FormHelperText>Estado del Trabajador</FormHelperText>
                    </FormControl>
                      <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={state.client_Line}
                              name="client_line"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'client_line' }}
                            >
                              <option value="" disabled>
                                Linea del Cliente
                              </option>
                              {line.map((value)=>(
                                <option value = {value.client_line} key = {value.id_credi_client_line}>
                                  {value.client_line}
                                </option>
                              ))}
                              
                            </NativeSelect>
                            <FormHelperText>Linea del Cliente</FormHelperText>
                          </FormControl>
                      </div>
                  </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Cliente {clientSeleccionado && clientSeleccionado.client_middle_name}?
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
  );
}

export default Client;