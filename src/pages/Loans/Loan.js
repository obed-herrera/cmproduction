import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import {Grid, TextField, makeStyles} from '@material-ui/core';
import  MultipleSelect from "../../controls/MultipleSelect";
import * as loanServices from '../../services/loanServices';
import "./LoanStyles.css";
import {useForm, Form} from '../../components/useForm';
import SideMenu from "../../components/SideMenu";
import Controls from "../../controls/Controls";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const paginacionOpciones={
  rowsPerPageText: 'Filas por Página',
  rangeSeparatorText: 'de',
  selectAlllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const loanState = [
    {id: 'activo', title: 'Activo'},
    {id: 'inactivo', title: 'Inactivo'},
]

const clientState = [
  {id: 'activo', title: 'Activo'},
  {id: 'inactivo', title: 'Inactivo'},
]

const onChangeTable=async e=>{
  e.persist();
  await this.setState({busqueda: e.target.value});
  console.log(this.state.busqueda);
}

function Loan() {
  const baseUrl="http://localhost/crediapi/loan.php";
  const baseUrl2="http://localhost/crediapi/client.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalInsertarNuevo, setModalInsertarNuevo]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [loanSeleccionado, setloanSeleccionado]=useState({
    id_credi_loan: '',
    client_name: '',
    loan_term: '',
    loan_payment:'',
    money_type: '',
    loan_mount:'',
    loan_interest:'',
    loan_line:''
  });
  const [clientSeleccionado, setClientSeleccionado]=useState({
    id_credi_client: '',
    client_first_name: '',
    client_second_name: '',
    client_middle_name: '',
    client_last_name: '',
    client_national_id: '',
    client_sys_code: '',
    client_home_address: '',
    client_business_address: '',
    client_state: '',
    client_line: '',
    client_phone: '',
    client_creation_date: new Date()
  });

  const [value, setValue] = React.useState('female');


  const classes = useStyles();
  const [state, setState] = React.useState({
    client_line: '',
  });

  const handleChangeClient=e=>{
    const {name, value}=e.target;
    setClientSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(clientSeleccionado);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setValue(e.target.value);
    setloanSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(loanSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalInsertarNuevo=()=>{
    setModalInsertarNuevo(!modalInsertarNuevo);
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
    f.append("client_name", loanSeleccionado.client_name);
    f.append("loan_term", loanSeleccionado.loan_term);
    f.append("loan_payment", loanSeleccionado.loan_payment);
    f.append("money_type", loanSeleccionado.loan_type);
    f.append("loan_mount", loanSeleccionado.loan_mount);
    f.append("loan_interest", loanSeleccionado.loan_interest);
    f.append("loan_line", loanSeleccionado.loan_line);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPostClient=async()=>{
    var f = new FormData();
    f.append("client_first_name", clientSeleccionado.client_first_name);
    f.append("client_second_name", clientSeleccionado.client_second_name);
    f.append("client_middle_name", clientSeleccionado.client_middle_name);
    f.append("client_last_name", clientSeleccionado.client_last_name);
    f.append("client_national_id", clientSeleccionado.client_national_id);
    f.append("client_sys_code", clientSeleccionado.client_sys_code);
    f.append("client_home_address", clientSeleccionado.client_home_address);
    f.append("client_business_address", clientSeleccionado.client_business_address);
    f.append("client_state", clientSeleccionado.client_state);
    f.append("client_line", clientSeleccionado.client_line);
    f.append("client_phone", clientSeleccionado.client_phone);
    f.append("METHOD", "POST");
    await axios.post(baseUrl2, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertarNuevo();
    }).catch(error=>{
      console.log(error);
    })
  }

  /*const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", loanSeleccionado.nombre);
    f.append("lanzamiento", loanSeleccionado.lanzamiento);
    f.append("desarrollador", loanSeleccionado.desarrollador);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: frameworkSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(framework=>{
        if(framework.id===frameworkSeleccionado.id){
          framework.nombre=frameworkSeleccionado.nombre;
          framework.lanzamiento=frameworkSeleccionado.lanzamiento;
          framework.desarrollador=frameworkSeleccionado.desarrollador;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }*/

  /*const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: frameworkSeleccionado.id}})
    .then(response=>{
      setData(data.filter(framework=>framework.id!==frameworkSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }*/

  const seleccionarloan=(credi_loan, caso)=>{
    setloanSeleccionado(credi_loan);

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
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Crear Nuevo Prestamo</button>
      <br /><br />
    <table className="table table-striped">
      
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Plazo</th>
          <th>Tipo de Pago</th>
          <th>Tipo de Moneda</th>
          <th>Monto</th>
          <th>Interes %</th>
          <th>Linea del Prestamo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((credi_loan, index)=>(
          <tr key={index}>
            <td>{credi_loan.client_name}</td>
            <td>{credi_loan.loan_term}</td>
            <td>{credi_loan.loan_payment}</td>
            <td>{credi_loan.money_type}</td>
            <td>{credi_loan.loan_mount}</td>
            <td>{credi_loan.loan_interest}</td>
            <td>{credi_loan.loan_line}</td>
          <td>
          <Controls.Button
                        type = "submit"
                        text = "Pagar"
                        /*color = "default"*/
                        onClick = {()=>seleccionarloan(credi_loan, "Editar")}
                    /> {"  "}
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar} contentClassName = "custom-modal-style-loan">
      <ModalHeader>Insertar Prestamo</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_name" onChange = {handleChange}/>
                            <span>Cliente</span>
                        </label>
                        <br/>
                        <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={state.loan_Term}
                              name="loan_term"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'loan_term' }}
                            >
                              <option value="" disabled>
                                Plazo del Prestamo
                              </option>
                              <option value={'30'}>1 Mes</option>
                              <option value={'60'}>2 Meses</option>
                              <option value={'90'}>3 Meses</option>
                              <option value={'120'}>4 Meses</option>
                              <option value={'150'}>5 Meses</option>
                              <option value={'180'}>6 Meses</option>
                              <option value={'210'}>7 Meses</option>
                              <option value={'240'}>8 Meses</option>
                              <option value={'270'}>9 Meses</option>
                              <option value={'300'}>10 Meses</option>
                              <option value={'330'}>11 Meses</option>
                              <option value={'360'}>12 Meses</option>
                            </NativeSelect>
                            <FormHelperText>Plazo del Prestamo</FormHelperText>
                          </FormControl>
                        </div>
                        <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={state.loan_Payment}
                              name="loan_payment"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'loan_payment' }}
                            >
                              <option value="" disabled>
                                Forma de pago
                              </option>
                              <option value={'1'}>Diario</option>
                              <option value={'1.5'}>Dia de por medio</option>
                              <option value={'7'}>Semanal</option>
                              <option value={'15'}>Quincenal</option>
                              <option value={'30'}>Mensual</option>
                            </NativeSelect>
                            <FormHelperText>Forma de Pago</FormHelperText>
                          </FormControl>
                        </div>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "loan_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "loan_mount" onChange = {handleChange}/>
                            <span>Monto del Prestamo</span>
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "loan_interest" onChange = {handleChange}/>
                            <span>Interés %</span>
                        </label>
                        <br/>
                    </div>                                    
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={state.money_Type}
                              name="money_type"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'money_type' }}
                            >
                              <option value="" disabled>
                                Tipo de Moneda
                              </option>
                              <option value={'Dolar'}>Dólar</option>
                              <option value={'Cordoba'}>Córdoba</option>
                            </NativeSelect>
                            <FormHelperText>Tipo de Moneda</FormHelperText>
                          </FormControl>
                  <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.loan_Line}
                        name="loan_line"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'loan_line' }}
                      >
                        <option value="" disabled>
                          Linea del Prestamo
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
                      </NativeSelect>
                      <FormHelperText>Linea del Prestamo</FormHelperText>
                    </FormControl>
                  </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
      <Controls.Button
                        /*type = "submit"*/
                        text = "Crear Cliente"
                        color = "default"
                        onClick = {()=>abrirCerrarModalInsertarNuevo()}
                    />
        <Controls.Button
                        /*type = "submit"*/
                        text = "Insertar"
                        /*color = "default"*/
                        onClick = {()=>peticionPost()}
                    /> {"  "}
          <Controls.Button
                        text = "Cancelar"
                        color = "secondary"
                        onClick = {()=>abrirCerrarModalInsertar()}
                    />
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalInsertarNuevo} contentClassName = "custom-modal-style-client">
      <ModalHeader>Insertar Cliente</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChangeClient}/>
                            <span>Primer Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_second_name" onChange = {handleChangeClient}/>
                            <span>Segundo Nombre</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_middle_name" onChange = {handleChangeClient}/>
                            <span>Primer Apellido</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_last_name" onChange = {handleChangeClient}/>
                            <span>Segundo Apellido</span> 
                        </label>
                        <br/>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_national_id" onChange = {handleChangeClient}/>
                            <span>Cedula del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_sys_code" onChange = {handleChangeClient}/>
                            <span>Codigo del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_home_address" onChange = {handleChangeClient}/>
                            <span>Direccion de casa</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_business_address" onChange = {handleChangeClient}/>
                            <span>Direccion de negocio</span> 
                        </label>
                        <br/>
                    </div>                                    
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_phone" onChange = {handleChangeClient}/>
                      <span>Telefono del Cliente</span> 
                    </label>
                    <br/>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.client_state}
                        name="client_state"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'client_state' }}
                      >
                        <option value="" disabled>
                          Estado del Cliente
                        </option>
                        <option value={'Activo'}>Activo</option>
                        <option value={'Inactivo'}>Inactivo</option>
                      </NativeSelect>
                      <FormHelperText>Estado del Trabajador</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.client_Line}
                        name="client_line"
                        onChange={handleChangeClient}
                        inputProps={{ 'aria-label': 'client_line' }}
                      >
                        <option value="" disabled>
                          Linea del Cliente
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
                      </NativeSelect>
                      <FormHelperText>Linea del Cliente</FormHelperText>
                    </FormControl>
                  </div>
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
      <Controls.Button
                        /*type = "submit"*/
                        text = "Insertar"
                        /*color = "default"*/
                        onClick = {()=>peticionPostClient()}
                    /> {"  "}
          <Controls.Button
                        text = "Cancelar"
                        color = "secondary"
                        onClick = {()=>abrirCerrarModalInsertarNuevo()}
                    />
      </ModalFooter>
    </Modal>

    </div>
  );
}

export default Loan;