import {React, useState} from 'react'
import LoanForm from "./LoanForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core';
import Copyright from '../../components/Copyright';

const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Loan(){

    const classes = useStyle();

    return(
        <>
        <PageHeader 
            title ="Prestamo nuevo"
            subTitle = "Formulario para crear un Prestamo Nuevo"
            icon = {<PeopleOutlineTwoToneIcon fontSize = "large" />}
        /> 
        <Paper className={classes.pageContent}>
            {<LoanForm />}           
        </Paper>
        <Copyright/>  
        </>
    )
}