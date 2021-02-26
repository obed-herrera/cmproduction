import { PeopleOutline, PeopleOutlineTwoTone } from '@material-ui/icons';
import {React, useState} from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core';
import useTable from "../../components/useTable";
import * as employeeServices from "../../services/employeeServices";

const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employee(){

    const classes = useStyle();
    const [records, setRecords] = useState(employeeServices.getAllEmployees())

    const {
        TblContainer
    }=useTable();

    return(
        <>
        <PageHeader 
            title ="Empleado nuevo"
            subTitle = "Esta vista esta destinada para la administracion de los empleados"
            icon = {<PeopleOutlineTwoToneIcon fontSize = "large" />}
        /> 
        <Paper className={classes.pageContent}>
            {<EmployeeForm />}
            <TblContainer>
                <TableBody>
                    {
                        records.map(item =>
                            (<TableRow key = {item.id}>
                                <TableCell>
                                    {item.Emloyee_First_Name}
                                </TableCell>
                                <TableCell>
                                    {item.Emloyee_Second_Name}
                                </TableCell>
                                <TableCell>
                                    {item.Emloyee_Middle_Name}
                                </TableCell>
                                <TableCell>
                                    {item.Emloyee_Last_Name}
                                </TableCell>
                            </TableRow>)
                            )
                    }
                </TableBody>
            </TblContainer>
        </Paper>  
        </>
    )
}