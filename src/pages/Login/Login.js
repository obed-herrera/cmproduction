import React from 'react'
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined';

export default function Login(){
    return(
        <>
        <PageHeader 
            title ="Login"
            subTitle = "Actualmente esta pantalla se encuentra en produccion"
            icon = {<PeopleOutlineTwoToneIcon fontSize = "large" />}
        /> 
        </>

    )
}