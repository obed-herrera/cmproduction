import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import {Grid, makeStyles} from '@material-ui/core';
import "./EmployeeStyles.css";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EmployeeState = [
    {id: 'activo', title: 'Activo'},
    {id: 'inactivo', title: 'Inactivo'},
]

function Employee() {
  const baseUrl="http://localhost/crediapi/employee.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [employeeSeleccionado, setEmployeeSeleccionado]=useState({
    id_employee: '',
    employee_first_name: '',
    employee_second_name: '',
    employee_middle_name: '',
    employee_last_name: '',
    employee_email:'',
    employee_phone:'',
    employee_address:'',
    employee_creation_date: new Date(),
    employee_created_by: '',
    employee_type: '',
    employee_state: '',
    employee_national_id: '',
    employee_line: ''
  });

  const classes = useStyles();
  const [state, setState] = React.useState({
    employee_type: '',
    employee_state: '',
  });


  const handleChange=e=>{
    const {name, value}=e.target;
    setEmployeeSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(employeeSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("employee_first_name", employeeSeleccionado.employee_first_name);
    f.append("employee_second_name", employeeSeleccionado.employee_second_name);
    f.append("employee_middle_name", employeeSeleccionado.employee_middle_name);
    f.append("employee_last_name", employeeSeleccionado.employee_last_name);
    f.append("employee_email", employeeSeleccionado.employee_email);
    f.append("employee_phone", employeeSeleccionado.employee_phone);
    f.append("employee_address", employeeSeleccionado.employee_address);
    f.append("employee_created_by", employeeSeleccionado.employee_created_by);
    f.append("employee_type", employeeSeleccionado.employee_type);
    f.append("employee_state", employeeSeleccionado.employee_state);
    f.append("employee_national_id", employeeSeleccionado.employee_national_id);
    f.append("employee_line", employeeSeleccionado.employee_line);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("employee_first_name", employeeSeleccionado.employee_first_name);
    f.append("employee_second_name", employeeSeleccionado.employee_second_name);
    f.append("employee_middle_name", employeeSeleccionado.employee_middle_name);
    f.append("employee_last_name", employeeSeleccionado.employee_last_name);
    f.append("employee_email", employeeSeleccionado.employee_email);
    f.append("employee_phone", employeeSeleccionado.employee_phone);
    f.append("employee_address", employeeSeleccionado.employee_address);
    f.append("employee_created_by", employeeSeleccionado.employee_created_by);
    f.append("employee_type", employeeSeleccionado.employee_type);
    f.append("employee_state", employeeSeleccionado.employee_state);
    f.append("employee_national_id", employeeSeleccionado.employee_national_id);
    f.append("employee_line", employeeSeleccionado.employee_line);

    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id_employee: employeeSeleccionado.id_employee}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(employee=>{
        if(employee.id_employee===employeeSeleccionado.id_employee){
          employee.employee_first_name=employeeSeleccionado.employee_first_name;
          employee.employee_second_name=employeeSeleccionado.employee_second_name;
          employee.employee_middle_name=employeeSeleccionado.employee_middle_name;
          employee.employee_last_name=employeeSeleccionado.employee_last_name;
          employee.employee_email=employeeSeleccionado.employee_email;
          employee.employee_phone=employeeSeleccionado.employee_phone;
          employee.employee_address=employeeSeleccionado.employee_address;
          employee.employee_created_by=employeeSeleccionado.employee_created_by;
          employee.employee_type=employeeSeleccionado.employee_type;
          employee.employee_state=employeeSeleccionado.employee_state;
          employee.employee_national_id=employeeSeleccionado.employee_national_id;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id_employee: employeeSeleccionado.id_employee}})
    .then(response=>{
      setData(data.filter(employee=>employee.id_employee!==employeeSeleccionado.id_employee));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarEmployee=(employee, caso)=>{
    setEmployeeSeleccionado(employee);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar Trabajador</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Primer Nombre</th>
          <th>Primer Apellido</th>
          <th>Cedula del Empleado</th>
          <th>Direccion de casa</th>
          <th>Tipo de empleado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((employee, index)=>(
          <tr key={index}>
            <td>{employee.employee_first_name}</td>
            <td>{employee.employee_middle_name}</td>
            <td>{employee.employee_national_id}</td>
            <td>{employee.employee_address}</td>
            <td>{employee.employee_type}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarEmployee(employee, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarEmployee(employee, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar} contentClassName = "custom-modal-style-employee">
      <ModalHeader>Insertar Trabajador</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_first_name" onChange = {handleChange}/>
                            <span>Primer Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_second_name" onChange = {handleChange}/>
                            <span>Segundo Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_middle_name" onChange = {handleChange}/>
                            <span>Primer Apellido</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_last_name" onChange = {handleChange}/>
                            <span>Segundo Apellido</span> 
                        </label>
                        <br/>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "Employee_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_national_id" onChange = {handleChange}/>
                            <span>Cedula del Trabajador</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_email" onChange = {handleChange}/>
                            <span>Correo</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_address" onChange = {handleChange}/>
                            <span>Direccion</span> 
                        </label>
                        <br/>
                        <FormControl className={classes.formControl}>
                        <NativeSelect
                          className={classes.selectEmpty}
                          value={state.employee_Created_By}
                          name="employee_created_by"
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'employee_created_by' }}
                        >
                        <option value="" disabled>
                          Trabajador creado por
                        </option>
                        <option value={'Raquel Narvaez'}>Raquel Narvaez</option>
                        <option value={'Keyla Reyes'}>Magaly Medina</option>
                        <option value={'Jennifer Emery'}>Magaly Medina</option>
                      </NativeSelect>
                      <FormHelperText>Trabajador creado por</FormHelperText>
                    </FormControl>
                    </div>                                    
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "employee_phone" onChange = {handleChange}/>
                      <span>Telefono </span> 
                    </label>
                    <br/>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.employee_Line}
                        name="employee_line"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'employee_line' }}
                      >
                        <option value="" disabled>
                          Linea del Trabajador
                        </option>
                        <option value={'Mercado Huembes'}>Mercado Huembes</option>
                        <option value={'Mercado Oriental'}>Mercado Oriental</option>
                        <option value={'Montetabor'}>Montetabor</option>
                        <option value={'Ticomo'}>Ticomo</option>
                        <option value={'San Jose O.'}>San Jose O.</option>
                        <option value={'Cuajachillo'}>Cuajachillo</option>
                        <option value={'Ciudad Sandino'}>Ciudad Sandino</option>
                        <option value={'Villa Reconciliacion'}>Villa Reconciliacion</option>
                        <option value={'Bello Amanecer 1'}>Bello Amanecer 1</option>
                        <option value={'Bello Amanecer 2'}>Bello Amanecer 2</option>
                        <option value={'Bello Amanecer 3'}>Bello Amanecer 3</option>
                        <option value={'Bello Amanecer 4'}>Bello Amanecer 4</option>
                        <option value={'Giorgino Andrae'}>Giorgino Andrae</option>
                        <option value={'Los Brasiles'}>Los Brasiles</option>
                        <option value={'Bella Cruz'}>Bella Cruz</option>
                        <option value={'Zona 3'}>Zona 3</option>
                        <option value={'Pulperia'}>Pulperia</option>
                        <option value={'Todas'}>Todas</option>
                      </NativeSelect>
                      <FormHelperText>Linea del Trabajador</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.employee_State}
                        name="employee_state"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'employee_state' }}
                      >
                        <option value="" disabled>
                          Estado del Trabajador
                        </option>
                        <option value={'Activo'}>Activo</option>
                        <option value={'Inactivo'}>Inactivo</option>
                      </NativeSelect>
                      <FormHelperText>Estado del Trabajador</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.employee_Type}
                        name="employee_type"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'employee_type' }}
                      >
                        <option value="" disabled>
                          Tipo de Trabajador
                        </option>
                        <option value={'Administrador'}>Administrador</option>
                        <option value={'Supervisor'}>Supervisor</option>
                        <option value={'Cobrador'}>Cobrador</option>
                      </NativeSelect>
                      <FormHelperText>Tipo de Trabajador</FormHelperText>
                    </FormControl>
                    <br/>
                  </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalEditar} contentClassName = "custom-modal-style-employee">
      <ModalHeader>Editar Trabajador</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_first_name" onChange = {handleChange}/>
                            <span>Primer Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_second_name" onChange = {handleChange}/>
                            <span>Segundo Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_middle_name" onChange = {handleChange}/>
                            <span>Primer Apellido</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_last_name" onChange = {handleChange}/>
                            <span>Segundo Apellido</span> 
                        </label>
                        <br/>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "Employee_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_national_id" onChange = {handleChange}/>
                            <span>Cedula del Trabajador</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_email" onChange = {handleChange}/>
                            <span>Correo</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "employee_address" onChange = {handleChange}/>
                            <span>Direccion</span> 
                        </label>
                        <br/>
                        <FormControl className={classes.formControl}>
                        <NativeSelect
                          className={classes.selectEmpty}
                          value={state.employee_Created_by}
                          name="employee_created_by"
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'employee_created_by' }}
                        >
                        <option value="" disabled>
                          Trabajador creado por
                        </option>
                        <option value={'Raquel Narvaez'}>Raquel Narvaez</option>
                        <option value={'Keyla Reyes'}>Magaly Medina</option>
                        <option value={'Jennifer Emery'}>Magaly Medina</option>
                      </NativeSelect>
                      <FormHelperText>Trabajador creado por</FormHelperText>
                    </FormControl>
                    </div>                                    
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "employee_phone" onChange = {handleChange}/>
                      <span>Telefono </span> 
                    </label>
                    <br/>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.employee_State}
                        name="employee_state"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'employee_state' }}
                      >
                        <option value="" disabled>
                          Estado del Trabajador
                        </option>
                        <option value={'Activo'}>Activo</option>
                        <option value={'Inactivo'}>Inactivo</option>
                      </NativeSelect>
                      <FormHelperText>Estado del Trabajador</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.employee_Type}
                        name="employee_type"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'employee_type' }}
                      >
                        <option value="" disabled>
                          Tipo de Trabajador
                        </option>
                        <option value={'Administrador'}>Administrador</option>
                        <option value={'Supervisor'}>Supervisor</option>
                        <option value={'Cobrador'}>Cobrador</option>
                      </NativeSelect>
                      <FormHelperText>Tipo de Trabajador</FormHelperText>
                    </FormControl>
                    <br/>
                  </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar al Trabajador {employeeSeleccionado && employeeSeleccionado.employee_middle_name}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Employee;