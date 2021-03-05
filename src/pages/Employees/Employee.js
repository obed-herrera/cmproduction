import { PeopleOutline, PeopleOutlineTwoTone } from '@material-ui/icons';
import {React, useState, useEffect} from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core';
import useTable from "../../components/useTable";
import * as employeeServices from "../../services/employeeServices";
import axios from 'axios';

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

    const peticionesGet = async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        peticionesGet();
    },[])

    const classes = useStyle();
    const [records, setRecords] = useState(employeeServices.getAllEmployees())

    const {
        TblContainer,
        TblHead
    } = useTable(records.headCells);

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
      <button className="btn btn-success">Insertar Empleado Nuevo</button>
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
            {data.map(employee => (
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
</div>
            
        </Paper>  
        </>
    )
}