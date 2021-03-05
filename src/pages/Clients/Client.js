import {React, useState, useEffect} from 'react'
import ClientForm from "./ClientForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core';
import useTable from "../../components/useTable";
import * as clientServices from "../../services/clientServices";
import Copyright from '../../components/Copyright';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { Grid, TextField, Typography} from '@material-ui/core';
import "./ClientStyles.css";
import {useForm, Form} from '../../components/useForm';
import Controls from "../../controls/Controls";
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

const Client = (props) =>{

    const baseUrl = "http://localhost/crediapi/";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado]=useState({
        id_credi_client: '',
        client_first_name: '',
        client_second_name: '',
        client_middle_name: '',
        client_last_name:'',
        client_national_id: '',
        client_sys_code: '',
        client_home_address: '',
        client_business_address: '',
        client_line: '',
        client_state: ''
    });

    const abrirCerrarModalInsertar = () =>{
        setModalInsertar(!modalInsertar);
    }

    const { buttonLabel, fullscreen } = props;

    const peticionesGet = async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionPost=async()=>{
        var f = new FormData();
        f.append("Primer Nombre", clienteSeleccionado.client_first_name);
        f.append("Segundo Nombre", clienteSeleccionado.client_second_name);
        f.append("Primer Apellido", clienteSeleccionado.client_middle_name);
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
      }

    const handleChange=e=>{
        const {name, value}=e.target;
        setClienteSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }))
        console.log(clienteSeleccionado);
      }

    useEffect(()=>{
        peticionesGet();
    },[])

    const classes = useStyle();
    const [records, setRecords] = useState(clientServices.getAllClients())

    const {
        TblContainer
    }=useTable();


    return(
        <>
        <PageHeader 
            title ="Cliente nuevo"
            subTitle = "Formulario para crear un Cliente Nuevo"
            icon = {<PeopleOutlineTwoToneIcon fontSize = "large" />}
        /> 
        <Paper className={classes.pageContent}>
            {/*<ClientForm />*/}
            <div style={{textAlign: 'center'}}>
        <   br />
        <button className="btn btn-success" onClick ={()=>abrirCerrarModalInsertar()}>Insertar Cliente Nuevo</button>
            <br /><br />
        <table className="table table-striped">
        <thead>
        <tr>
          <th>ID</th>
          <th>Primer Nombre</th>
          <th>Primer Apellido</th>
          <th>Cedula</th>
          <th>Linea</th>
          <th>Direccion</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
            {data.map(client=>(
                <tr key={client.id_credi_client}>
                    <td>{client.id_credi_client}</td>
                    <td>{client.client_first_name}</td>
                    <td>{client.client_middle_name}</td>
                    <td>{client.client_national_id}</td>
                    <td>{client.client_line}</td>
                    <td>{client.client_home_address}</td>
                    <td>
                        <button className = "btn btn-primary">Editar</button>{"   "}
                        <button className = "btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))}  
        </tbody> 

    </table>
        <div class="modal-dialog modal-lg">
        <Modal isOpen={modalInsertar} contentClassName = "custom-modal-style">
      <ModalHeader>Insertar Framework</ModalHeader>
      <ModalBody>
        {/*<ClientForm/>*/}
        <div className="form-group">
            <Grid container spacing = {2}>
            <Grid item xs ={4}>
                <label>Primer Nombre: </label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                <br />
                <label>Segundo Nombre: </label>
                <br />
                <input type="text" className="form-control" name="lanzamiento" onChange={handleChange}/>
                <br />
                <label>Primer Apellido: </label>
                <br />
                <input type="text" className="form-control" name="desarrollador" onChange={handleChange}/>
                <br />
                <label>Segundo Apellido: </label>
                <br />
                <input type="text" className="form-control" name="desarrollador" onChange={handleChange}/>
                <br />
            </Grid>
            <Grid item xs ={4}>
                <label>Cedula: </label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                <br />
                <label>Codigo del Sistema: </label>
                <br />
                <input type="text" className="form-control" name="lanzamiento" onChange={handleChange}/>
                <br />
                <label>Direccion de Casa: </label>
                <br />
                <input type="text" className="form-control" name="desarrollador" onChange={handleChange}/>
                <br />
                <label>Direccion del Negocio: </label>
                <br />
                <input type="text" className="form-control" name="desarrollador" onChange={handleChange}/>
                <br />
            </Grid>
            <Grid item xs ={4}>
                <label>Linea: </label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                <br />
                <label>Estado del Cliente: </label>
                <br />
                <input type="text" className="form-control" name="lanzamiento" onChange={handleChange}/>
                <br />
                    
            </Grid>
            </Grid>
        </div> 
      </ModalBody>
      <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
            </div>
        </div>
    </Paper>
        
    <Copyright/>  
        </>
    )
}

export default Client;