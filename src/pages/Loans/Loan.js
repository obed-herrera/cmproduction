import {React, useState} from 'react'
import LoanForm from "./LoanForm";
import PageHeader from "../../components/PageHeader";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
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
            title ="Préstamo nuevo"
            subTitle = "Formulario para crear un Préstamo Nuevo"
            icon = {<AttachMoneyIcon fontSize = "large" />}
        /> 
        <Paper className={classes.pageContent}>
            {<LoanForm />}           
        </Paper>
        <Copyright/>  
        </>
    )
}