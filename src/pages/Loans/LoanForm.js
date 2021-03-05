import React from 'react'
import { Grid, Typography} from '@material-ui/core';
import {useForm, Form} from '../../components/useForm';
import * as loanServices from '../../services/loanServices';

import Controls from "../../controls/Controls";

const loanState = [
    {id: 'activo', title: 'Activo'},
    {id: 'inactivo', title: 'Inactivo'},
]

const initialFValues ={
    ID_Loan: 0,
    ID_Client: '',
    Loan_Mount: '',
    Loan_Interest: '',
    Loan_Term: '',
    Loan_Delivery_Date: new Date(),
    Loan_Initial_Date: new Date(),
    Loan_End_Date: new Date(),
    Loan_Cuota: '',
    Loan_Created_By: '',
    Loan_State:'Activo'
}

export default function LoanForm(){

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
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
        

        if(fieldValues === values)
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
            loanServices.insertLoan(values)
            resetForm()
        }
    }

    return(
        <Form onSubmit = {handleSubmit}>
            <Typography>
                    Ingrese los datos del préstamo
                </Typography>
            <Grid container>
                <Grid item xs ={4}>
                <Controls.Select
                    name = "ID_Client"
                    label = "Cliente"
                    value = {values.ID_Client}
                    onChange={handleInputChange}
                    options = {loanServices.getClientCollection()}
                />
                    <Controls.Input 
                        name = "Loan_Mount"
                        label = "Monto del Préstamo"
                        value = {values.Loan_Mount}
                        onChange = {handleInputChange}
                        error = {errors.Loan_Mount}
                    />
                    <Controls.Input 
                        name = "Loan_Interest"
                        label = "Interes del Préstamo"
                        value = {values.Loan_Interest}
                        onChange = {handleInputChange}
                        error = {errors.Loan_Interest}
                    />
                    <Controls.Select
                    name = "Loan_Term"
                    label = "Plazo del Préstamo"
                    value = {values.Loan_Term}
                    onChange={handleInputChange}
                    options = {loanServices.getLoanTerms()}
                />
                </Grid>
                <Grid item xs ={4}>
                <Controls.DatePicker
                    name = "Loan_Delivery_Date"
                    label = "Fecha de Entrega del Préstamo"
                    value = {values.Loan_Delivery_Date}
                    onChange = {handleInputChange}
                /> 
                <Controls.DatePicker
                    name = "Loan_Initial_Date"
                    label = "Fecha de Inicio del Préstamo"
                    value = {values.Loan_Initial_Date}
                    onChange = {handleInputChange}
                /> 
                <Controls.DatePicker
                    name = "Loan_End_Date"
                    label = "Fecha Final del Préstamo"
                    value = {values.Loan_End_Date}
                    onChange = {handleInputChange}
                />                     
                </Grid>
                <Grid item xs = {4}>
                <Controls.RadioGroup
                    name = "Loan_State"
                    label = "Estado del Préstamo"
                    value = {values.Loan_State}
                    onChange = {handleInputChange}
                    items = {loanState}
                    error = {errors.Loan_State}/>
                <Controls.Select
                    name = "Loan_Created_By"
                    label = "Creado Por"
                    value = {values.Loan_Created_By}
                    onChange={handleInputChange}
                    options = {loanServices.getPersonCollection()}
                />
                <div>
                    <Controls.Button
                        type = "submit"
                        text = "Generar Préstamo"
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