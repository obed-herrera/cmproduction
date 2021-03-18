import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default function Configuration(){
    const classes = useStyles();
    return(
        <>
        <PageHeader 
            title ="Configuración"
            subTitle = "En esta parte pueden hacer sus configuraciones"
            icon = {<PeopleOutlineTwoToneIcon fontSize = "large" />}
        /> 
        <div>
            <Grid container justify = "center">
                <Grid item xs = {2}>
                    <Grid item>
                        <Link to = '/createuser'>
                        <Button
                            variant = "container"
                            color = "secondary"
                            className = {classes.button}
                            startIcon = {<GroupAddIcon/>}
                        >
                        Administrar Usuarios 
                        </Button>
                        </Link>
                    </Grid>
                    <Button
                        variant = "container"
                        color = "default"
                        className = {classes.button}
                        startIcon = {<DeleteIcon/>}
                    >
                    Futura configuracion 
                    </Button>
                    <Button
                        variant = "container"
                        color = "secondary"
                        className = {classes.button}
                        startIcon = {<DeleteIcon/>}
                    >
                    Futura configuracion
                    </Button>
                </Grid>
                
            </Grid> 
        </div>
        </>

    )
}