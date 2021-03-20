import React, {useState, useEffect, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import {Grid, TextField, makeStyles, emphasize} from '@material-ui/core';
import  MultipleSelect from "../../controls/MultipleSelect";
import * as clientServices from '../../services/clientServices';
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
import "./CreateLineStyles.css"

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CreateLine() {

    const baseUrl="http://localhost/crediapi/line.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [lineSeleccionado, setLineSeleccionado]=useState({
    id_credi_client_line: '',
    clinet_line: ''
  });

  const [q, setQ] = useState("");

  const classes = useStyles();
  const [state, setState] = React.useState({
    client_line: '',
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setLineSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(lineSeleccionado);
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
    f.append("client_line", lineSeleccionado.client_line);
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
    f.append("client_line", lineSeleccionado.client_line);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: lineSeleccionado.id_credi_line}})
    .then(response=>{
      var dataNueva= data;
      dataNueva && dataNueva.map(line=>{
        if(line.id_credi_client_line===lineSeleccionado.id_credi_client_line){
          line.client_line=lineSeleccionado.client_line;
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
    await axios.post(baseUrl, f, {params: {id_credi_client_line: lineSeleccionado.id_credi_client_line}})
    .then(response=>{
      setData(data.filter(line=>line.id_credi_client_line!==lineSeleccionado.id_credi_clinet_line));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarLine=(line, caso)=>{
    setLineSeleccionado(line);

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
                        text = "Insertar Nueva Linea"
                        color = "default"
                        onClick = {()=>abrirCerrarModalInsertar()}
                    />
      {/*<button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar Cliente</button>*/}
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Linea</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((line, index)=>(
          <tr key={index}>
            <td>{line.client_line}</td>
          <td>
          <Controls.Button
                        type = "submit"
                        text = "Editar"
                        /*color = "default"*/
                        onClick = {()=>seleccionarLine(line, "Editar")}
                    /> {"  "}
          <Controls.Button
                        text = "Eliminar"
                        color = "default"
                        onClick = {()=>seleccionarLine(line, "Eliminar")}
                    />
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar} contentClassName = "custom-modal-style-line">
      <ModalHeader>Insertar Nueva Linea</ModalHeader>
      <ModalBody>
            <Grid container spacing = {1} style = {{padding:20}}>
                <Grid item xs ={25}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_line" onChange = {handleChange}/>
                            <span>Nombre de la Linea</span> 
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
    <ModalHeader>Editar Linea</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_line" onChange = {handleChange} value = {lineSeleccionado && lineSeleccionado.client_line}/>
                            <span>Usuario</span> 
                        </label>
                        <br/>
                    </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar esta linea {lineSeleccionado && lineSeleccionado.client_line}?
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

export default CreateLine