import { PeopleOutline, PeopleOutlineTwoTone } from '@material-ui/icons';
import React from 'react'
import ClientForm from "./ClientForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Client(){

    const classes = useStyle();

    return(
        <>
        <PageHeader 
            title ="New Client"
            subTitle = "Form design with validation"
            icon = {<PeopleOutlineTwoToneIcon fontSize = "large" />}
        /> 
        <Paper className={classes.pageContent}>
            <ClientForm />
        </Paper>
        
        </>
    )
}