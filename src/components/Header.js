import React from 'react'
import {AppBar, Text, Toolbar, makeStyles, Grid, IconButton, InputBase, Badge, Typography} from '@material-ui/core'
import inputBase from '@material-ui/core';
import Today from '@material-ui/icons/Today';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
//import makeStyles from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor: "#fff",
        transform: 'translateZ(0)'
    }
}))

export default function Header(){

    const classes = useStyles();
    return(
        <AppBar position = "static" className={classes.root}>
            <Toolbar>
                <Grid container>
                    <Grid item>
                        <Typography variant = "h4" color = "textPrimary">
                            CrediMarket
                        </Typography>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                    <IconButton>
                        <Today />
                    </IconButton>
                    <Link to = '/login'>
                        <IconButton >
                            <PowerSettingsNewIcon  />
                        </IconButton>
                    </Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}