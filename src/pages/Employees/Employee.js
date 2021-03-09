import { PeopleOutline, PeopleOutlineTwoTone } from '@material-ui/icons';
import {React, useState, useEffect} from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core';
import useTable from "../../components/useTable";
import * as employeeServices from "../../services/employeeServices";
import axios from 'axios';
import "./EmployeeStyles.css";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import  {Grid}  from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const headCells = [
    {id: 'Employee_First_Name', label: 'Primer Nombre'},
    {id: 'Employee_Second_Name', label: 'Segundo Nombre'},
    {id: 'Employee_Middle_Name', label: 'Primer Apellido'},
    {id: 'Employee_Last_Name', label: 'Segundo Apellido'},
]

export default function Employee(){

    const baseUrl = "http://localhost/crediapi/employee.php";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [empleadoSeleccionado, setEmpleadoSeleccionado]=useState({
        id_employee: '',
        employee_first_name: '',
        employee_second_name: '',
        employee_middle_name: '',
        employee_last_name:'',
        employee_email: '',
        employee_phone: '',
        employee_address: '',
        employee_creation_date: '',
        employee_type: '',
        employee_state: ''    
    });

    const handleChange=e=>{
        const {name, value}=e.target;
        setEmpleadoSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }))
        console.log(empleadoSeleccionado);
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
        f.append("employee_first_name", empleadoSeleccionado.employee_first_name);
        f.append("employee_second_name", empleadoSeleccionado.employee_second_name);
        f.append("employee_middle_name", empleadoSeleccionado.employee_middle_name);
        f.append("employee_last_name", empleadoSeleccionado.employee_last_name);
        f.append("employee_national_id", empleadoSeleccionado.employee_national_id);
        f.append("employee_sys_code", empleadoSeleccionado.employee_sys_code);
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        })
      }

    

    useEffect(()=>{
        peticionesGet();
    },[])

    const classes = useStyle();
    //const [records, setRecords] = useState(clientServices.getAllClients())

    const {
        TblContainer
    }=useTable();

    return(
        <>
        <PageHeader 
            title ="Empleado nuevo"
            subTitle = "Formulario para crear un Empleado Nuevo"
            icon = {<PeopleOutlineTwoToneIcon fontSize = "large" />}
        /> 
        <Paper className={classes.pageContent}>
            {/*<EmployeeForm />*/}
            <div style={{textAlign: 'center'}}>
        <   br />
      <button className="btn btn-success" onClick ={()=>abrirCerrarModalInsertar()}>Insertar Empleado Nuevo</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Primer Nombre</th>
          <th>Primer Apellido</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
            {data.map(employee=> (
                <tr key={employee.id_employee}>
                    <td>{employee.id_employee}</td>
                    <td>{employee.employee_first_name}</td>
                    <td>{employee.employee_middle_name}</td>
                    <td>
                        <button className = "btn btn-primary">Editar</button>{"   "}
                        <button className = "btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))}  
        </tbody> 

    </table>
    <div className = "modal-dialog modal-lg">
        <Modal isOpen = {modalInsertar} contentClassName = "custom-modal-style">
            <ModalHeader>Insertar Empleado</ModalHeader>
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
                            <label>Linea: </label>
                            <br />
                            <input type="text" className="form-control" name="client_line" onChange={handleChange}/>
                            <br />
                            <label>Estado del Cliente: </label>
                            <br />
                            <input type="text" className="form-control" name="client_state" onChange={handleChange}/>
                            <br />   
                        </Grid>
                    </Grid>
                </div> 
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={()=>peticionesPost()}>Insertar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    </div>
</div>
            
        </Paper>  
        </>
    )
}