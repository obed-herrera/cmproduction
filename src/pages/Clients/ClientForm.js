import React from 'react'
import { Grid, TextField,FormControl,FormLabel, Typography, TextareaAutosize} from '@material-ui/core';
import {useForm, Form} from '../../components/useForm';
import * as employeeServices from '../../services/employeeServices';

import Controls from "../../controls/Controls";

const clientState = [
    {id: 'activo', title: 'Activo'},
    {id: 'inactivo', title: 'Inactivo'},
]

const initialFValues ={
    ID_Employee:0,
    Employee_First_Name:'',
    Employee_Second_Name:'',
    Employee_Middle_Name:'',
    Eployee_Last_Name:'',
    Employee_Email:'',
    Employee_Phone:'',
    Employee_Address:'',
    Employee_Creation_Date: new Date(),
    Employee_Created_By:'',
    Employee_Type:'',
    Employee_State:'Activo'
}

export default function ClientForm(){

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if('Employee_First_Name' in fieldValues)
            temp.Employee_First_Name = fieldValues.Employee_First_Name ? "" : "Este campo es necesario"
        if('Employee_Second_Name' in fieldValues)
            temp.Employee_Second_Name = fieldValues.Employee_Second_Name ? "" : "Este campo es necesario"
        if('Employee_Middle_Name' in fieldValues)
            temp.Employee_Middle_Name = fieldValues.Employee_Middle_Name? "" : "Este campo es necesario"
        if('Employee_Last_Name' in fieldValues)
            temp.Employee_Last_Name = fieldValues.Employee_Last_Name ? "": "Este campo es necesario"
        if('Employee_Email' in fieldValues)
            temp.Employee_Email = (/$^|.+@.+..+/).test(fieldValues.Employee_Email) ? "" : "El email inválido"
        if('Employee_Phone' in fieldValues)
            temp.Employee_Phone = fieldValues.Employee_Phone.length > 8 ? "" : "El minimo de caracteres es 9"
        if('Employee_Address' in fieldValues)
            temp.Employee_Address = fieldValues.Employee_Address < 100 ? "" : "El maximo de caraceres es 100"
        if('Employee_Created_By' in fieldValues)
            temp.Employee_Created_By = fieldValues.Employee_Created_By.length !== 0 ? "" : "Este campo es necesario"
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
            employeeServices.insertEmployee(values)
            resetForm()
        }
    }

    return(
        <Form onSubmit = {handleSubmit}>
            <Typography>
                    Ingrese los datos del empleado
                </Typography>
            <Grid container>
                <Grid item xs ={4}>
                    <Controls.Input 
                        name = "Employee_First_Name"
                        label = "Primer Nombre"
                        value = {values.Employee_First_Name}
                        onChange = {handleInputChange}
                        error = {errors.Employee_First_Name}
                    />
                    <Controls.Input 
                        name = "Employee_Second_Name"
                        label = "Segundo Nombre"
                        value = {values.Employee_Second_Name}
                        onChange = {handleInputChange}
                        error = {errors.Employee_Second_Name}
                    />
                    <Controls.Input 
                        name = "Employee_Middle_Name"
                        label = "Primer Apellido"
                        value = {values.Employee_Middle_Name}
                        onChange = {handleInputChange}
                        error = {errors.Employee_Middle_Name}
                    />
                    <Controls.Input 
                        name = "Employee_Last_Name"
                        label = "Segundo Apellido"
                        value = {values.Employee_Last_Name}
                        onChange = {handleInputChange}
                        error = {errors.Employee_Last_Name}
                    />
                </Grid>
                <Grid item xs ={4}>
                    <TextField
                        variant = "standard"
                        label = "Correo"
                        name = "Employee_Email"
                        value = {values.Employee_Email}
                        onChange = {handleInputChange}
                        error = {errors.Employee_Email}
                    />
                    <TextField
                        variant = "standard"
                        label = "Telefono"
                        name = "Employee_Phone"
                        value = {values.Employee_Phone}
                        onChange = {handleInputChange}
                        error = {errors.Employee_Phone}
                    />
                    <FormControl>
                        <FormLabel>
                            Dirección
                            <TextareaAutosize rowsMin = {3}/>
                        </FormLabel>
                    </FormControl>
                    <Controls.RadioGroup
                    name = "Employee_State"
                    label = "Estado"
                    value = {values.Employee_State}
                    onChange = {handleInputChange}
                    items = {clientState}
                    error = {errors.Employee_Address}/>
                    
                </Grid>
                <Grid item xs = {4}>
                <Controls.Select
                    name = "Employee_Created_By"
                    label = "Creado Por"
                    value = {values.Employee_Created_By}
                    onChange={handleInputChange}
                    options = {employeeServices.getPersonCollection()}
                />
                <Controls.Select
                    name = "Employee_Type"
                    label = "Tipo de empleado"
                    value = {values.Employee_Type}
                    onChange={handleInputChange}
                    options = {employeeServices.getEmployeeType()}
                />
                <Controls.DatePicker
                    name = "Employee_Creation_Date"
                    label = "Fecha de Cracion"
                    value = {values.Employee_Creation_Date}
                    onChange = {handleInputChange}
                />   

                <div>
                    <Controls.Button
                        type = "submit"
                        text = "Enviar"
                    />
                    <Controls.Button
                        text = "Cancelar"
                        color = "default"
                        onClick = {resetForm}
                    />
                </div>
                </Grid>
            </Grid>
        </Form>
    )
}