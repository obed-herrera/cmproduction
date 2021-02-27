import React from 'react'
import { Grid, TextField,FormControl,FormLabel, Typography, TextareaAutosize} from '@material-ui/core';
import {useForm, Form} from '../../components/useForm';
import * as clientServices from '../../services/clientServices';

import Controls from "../../controls/Controls";

const clientState = [
    {id: 'activo', title: 'Activo'},
    {id: 'inactivo', title: 'Inactivo'},
]

const initialFValues ={
    ID_Client:0,
    Client_First_Name: '',
    Client_Second_Name:'',
    Client_Middle_Name:'',
    Client_Last_Name:'',
    Client_National_ID:'',
    Client_Sys_Code:'',
    Client_Business_Address:'',
    Client_Home_Address: '',
    Client_Creation_Date:new Date(),
    Client_Phone:'',
    Client_State:'Activo'
}

export default function ClientForm(){

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if('Client_First_Name' in fieldValues)
            temp.Client_First_Name = fieldValues.Client_First_Name ? "" : "Este campo es necesario"
        if('Client_Second_Name' in fieldValues)
            temp.Client_Second_Name = fieldValues.Client_Second_Name ? "" : "Este campo es necesario"
        if('Client_Middle_Name' in fieldValues)
            temp.Cliente_Middle_Name = fieldValues.Client_Middle_Name? "" : "Este campo es necesario"
        if('Client_Last_Name' in fieldValues)
            temp.Client_Last_Name = fieldValues.Client_Last_Name ? "": "Este campo es necesario"
        if('Client_Phone' in fieldValues)
            temp.Client_Phone = fieldValues.Client_Phone.length > 7 ? "" : "El minimo de caracteres es 9"
        if('Client_National_ID' in fieldValues)
            temp.Client_National_ID = fieldValues.Client_National_ID.length > 15 ? "" : "El minimo de caracteres es 9"
        if('Client_Business_Address' in fieldValues)
            temp.Client_Business_Address = fieldValues.Client_Business_Address < 100 ? "" : "El maximo de caraceres es 100"
        if('Client_Home_Address' in fieldValues)
            temp.Client_Home_Address = fieldValues.Client_Home_Address < 100 ? "" : "El maximo de caraceres es 100"
        if('Client_Created_By' in fieldValues)
            temp.Client_Created_By = fieldValues.Client_Created_By.length !== 0 ? "" : "Este campo es necesario"
        setErrors({
            ...temp
        })
        

        if(fieldValues == values)
            return Object.values(temp).every(x => x === "")
    }

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }=useForm(initialFValues, true, validate);

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){
            clientServices.insertClient(values)
            resetForm()
        }
    }

    return(
        <Form onSubmit = {handleSubmit}>
            <Typography>
                    Ingrese los datos del cliente
                </Typography>
            <Grid container>
                <Grid item xs ={4}>
                    <Controls.Input 
                        name = "Client_First_Name"
                        label = "Primer Nombre"
                        value = {values.Client_First_Name}
                        onChange = {handleInputChange}
                        error = {errors.Client_First_Name}
                    />
                    <Controls.Input 
                        name = "Client_Second_Name"
                        label = "Segundo Nombre"
                        value = {values.Client_Second_Name}
                        onChange = {handleInputChange}
                        error = {errors.Client_Second_Name}
                    />
                    <Controls.Input 
                        name = "Client_Middle_Name"
                        label = "Primer Apellido"
                        value = {values.Client_Middle_Name}
                        onChange = {handleInputChange}
                        error = {errors.Client_Middle_Name}
                    />
                    <Controls.Input 
                        name = "Client_Last_Name"
                        label = "Segundo Apellido"
                        value = {values.Client_Last_Name}
                        onChange = {handleInputChange}
                        error = {errors.ClientClient_Last_Name}
                    />
                </Grid>
                <Grid item xs ={4}>
                    <TextField
                        variant = "outlined"
                        label = "Cédula del Cliente"
                        name = "Client_National_ID"
                        value = {values.Client_National_ID}
                        onChange = {handleInputChange}
                        error = {errors.Client_National_ID}
                    />
                    <TextField
                        variant = "outlined"
                        label = "Teléfono / Celular"
                        name = "Client_Phone"
                        value = {values.Client_Phone}
                        onChange = {handleInputChange}
                        error = {errors.Client_Phone}
                    />
                    <TextField
                        variant = "outlined"
                        label = "Dirección del Cliente"
                        name = "Client_Business_Address"
                        value = {values.Client_Home_Address}
                        onChange = {handleInputChange}
                        error = {errors.Client_Home_Address}
                    />
                    <TextField
                        variant = "outlined"
                        label = "Dirección del Negocio"
                        name = "Client_Home_Address"
                        value = {values.Client_Home_Address}
                        onChange = {handleInputChange}
                        error = {errors.Client_Home_Address}
                    />                                      
                </Grid>
                <Grid item xs = {4}>
                <Controls.RadioGroup
                    name = "Client_State"
                    label = "Estado del Cliente"
                    value = {values.Client_State}
                    onChange = {handleInputChange}
                    items = {clientState}
                    error = {errors.Client_Address}/>
                <Controls.Select
                    name = "Client_Created_By"
                    label = "Creado Por"
                    value = {values.Client_Created_By}
                    onChange={handleInputChange}
                    options = {clientServices.getPersonCollection()}
                />
                <Controls.DatePicker
                    name = "Client_Creation_Date"
                    label = "Fecha de Creación"
                    value = {values.Client_Creation_Date}
                    onChange = {handleInputChange}
                />   

                <div>
                    <Controls.Button
                        type = "submit"
                        text = "Enviar"
                    />
                    <Controls.Button
                        text = "Resetear Formulario"
                        color = "default"
                        onClick = {resetForm}
                    />
                </div>
                </Grid>
            </Grid>
        </Form>
    )
}