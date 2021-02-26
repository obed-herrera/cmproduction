import React from 'react'
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleAltOutlined';

export default function Loan(){
    return(
        <>
        <PageHeader 
            title ="Préstamo nuevo"
            subTitle = "Actualmente esta pantalla se encuentra en produccion"
            icon = {<PeopleOutlineTwoToneIcon fontSize = "large" />}
        /> 
        </>

    )
}