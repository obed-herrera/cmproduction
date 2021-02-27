import { PeopleOutline, PeopleOutlineTwoTone } from '@material-ui/icons';
import {React, useState} from 'react'
import ClientForm from "./ClientForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined'
import {Paper, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core';
import useTable from "../../components/useTable";
import * as clientServices from "../../services/clientServices";
import Copyright from '../../components/Copyright';

const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Client(){

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
            {<ClientForm />}
            <TblContainer>
                <TableBody>
                    {
                        records.map(item =>
                            (<TableRow key = {item.id}>
                                <TableCell>
                                    {item.Client_First_Name}
                                </TableCell>
                                <TableCell>
                                    {item.Client_Second_Name}
                                </TableCell>
                                <TableCell>
                                    {item.Client_Middle_Name}
                                </TableCell>
                                <TableCell>
                                    {item.Client_Last_Name}
                                </TableCell>
                            </TableRow>)
                            )
                    }
                </TableBody>
            </TblContainer>
            
        </Paper>
        <Copyright/>  
        </>
    )
}