import { PeopleOutline, PeopleOutlineTwoTone } from '@material-ui/icons';
import React from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles, TableBody} from '@material-ui/core';
import useTable from "../../components/useTable";

const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employee(){

    const classes = useStyle();

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
            {/*<EmployeeForm />*/}
            <TblContainer>
                <TableBody>
                    
                </TableBody>
            </TblContainer>
        </Paper>
        
        </>
    )
}