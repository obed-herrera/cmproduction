import {React, useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles} from '@material-ui/core';
import useTable from "../../components/useTable";
import * as clientServices from "../../services/clientServices";
import Copyright from '../../components/Copyright';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import  {Grid}  from '@material-ui/core';
import "./ClientStyles.css";

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

    const baseUrl = "http://localhost/crediapi/client.php";
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
        client_state: '',
        client_line: ''    
    });

    const handleChange=e=>{
        const {name, value}=e.target;
        setClienteSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }))
        console.log(clienteSeleccionado);
      }

    const abrirCerrarModalInsertar = () =>{
        setModalInsertar(!modalInsertar);
    }

    const peticionesGet = async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionesPost=async()=>{
        var f = new FormData();
        f.append("client_first_name", clienteSeleccionado.client_first_name);
        f.append("client_second_name", clienteSeleccionado.client_second_name);
        f.append("client_middle_name", clienteSeleccionado.client_middle_name);
        f.append("client_last_name", clienteSeleccionado.client_last_name);
        f.append("client_national_id", clienteSeleccionado.client_national_id);
        f.append("client_sys_code", clienteSeleccionado.client_sys_code);
        f.append("client_home_address", clienteSeleccionado.client_home_address);
        f.append("client_business_address", clienteSeleccionado.client_business_address);
        f.append("client_state", clienteSeleccionado.client_state);
        f.append("client_line", clienteSeleccionado.client_line);
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
        .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        }).catch(error=>{
        console.log(error);
        })
    }

    const peticionPost=async()=>{
        var f = new FormData();
        f.append("client_first_name", clienteSeleccionado.client_first_name);
        f.append("client_second_name", clienteSeleccionado.client_second_name);
        f.append("client_middle_name", clienteSeleccionado.client_middle_name);
        f.append("client_last_name", clienteSeleccionado.client_last_name);
        f.append("client_national_id", clienteSeleccionado.client_national_id);
        f.append("client_sys_code", clienteSeleccionado.client_sys_code);
        f.append("client_home_address", clienteSeleccionado.client_home_address);
        f.append("client_business_address", clienteSeleccionado.client_business_address);
        f.append("client_state", clienteSeleccionado.client_state);
        f.append("client_line", clienteSeleccionado.client_line);
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
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
          <th>Segundo Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Cedula</th>
          <th>Codigo del Cliente</th>
          <th>Direccion de casa</th>
          <th>Direccion de negocio</th>
          <th>Estado del Cliente</th>
          <th>Linea</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
            {data.map(Client=>(
                <tr key={Client.id_credi_client}>
                    <td>{Client.id_credi_client}</td>
                    <td>{Client.client_first_name}</td>
                    <td>{Client.client_second_name}</td>
                    <td>{Client.client_middle_name}</td>
                    <td>{Client.client_last_name}</td>
                    <td>{Client.client_national_id}</td>
                    <td>{Client.client_sys_code}</td>
                    <td>{Client.client_home_address}</td>
                    <td>{Client.client_business_address}</td>
                    <td>{Client.client_state}</td>
                    <td>{Client.client_line}</td>
                    <td>
                        <button className = "btn btn-primary">Editar</button>{"   "}
                        <button className = "btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))}  
        </tbody> 

    </table>
        <Modal isOpen={modalInsertar} contentClassName = "custom-modal-style">
            <ModalHeader>Insertar Cliente</ModalHeader>
            <ModalBody>
                {/*<ClientForm/>*/}
                <div className="form-group">
                    <Grid container spacing = {2}>
                        <Grid item xs ={4}>
                            <label>Primer Nombre: </label>
                            <br />
                            <input type="text" className="form-control" name="client_first_name" onChange={handleChange}/>
                            <br />
                            <label>Segundo Nombre: </label>
                            <br />
                            <input type="text" className="form-control" name="client_second_name" onChange={handleChange}/>
                            <br />
                            <label>Primer Apellido: </label>
                            <br />
                            <input type="text" className="form-control" name="client_middle_name" onChange={handleChange}/>
                            <br />
                            <label>Segundo Apellido: </label>
                            <br />
                            <input type="text" className="form-control" name="client_last_name" onChange={handleChange}/>
                            <br />
                        </Grid>
                        <Grid item xs ={4}>
                            <label>Cedula: </label>
                            <br />
                            <input type="text" className="form-control" name="client_national_id" onChange={handleChange}/>
                            <br />
                            <label>Codigo del Sistema: </label>
                            <br />
                            <input type="text" className="form-control" name="client_sys_code" onChange={handleChange}/>
                            <br />
                            <label>Direccion de Casa: </label>
                            <br />
                            <input type="text" className="form-control" name="client_home_address" onChange={handleChange}/>
                            <br />
                            <label>Direccion del Negocio: </label>
                            <br />
                            <input type="text" className="form-control" name="client_business_address" onChange={handleChange}/>
                            <br />
                        </Grid>
                        <Grid item xs ={4}>
                            <label>Estado del Cliente: </label>
                            <br />
                            <input type="text" className="form-control" name="client_state" onChange={handleChange}/>
                            <br />  
                            <label>Linea: </label>
                            <br />
                            <input type="text" className="form-control" name="client_line" onChange={handleChange}/>
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
    </Paper>
        
    <Copyright/>  
        </>
    )
}

export default Client;