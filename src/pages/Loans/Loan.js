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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { FaRegistered } from 'react-icons/fa';
import {getClients} from '../../Requests';

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
  const baseUrl="http://credimarketnic.com/crediapi/loan.php";
  const baseUrl2="http://credimarketnic.com/crediapi/client.php";
  const baseUrl3="http://credimarketnic.com/crediapi/payment.php";
  const [data, setData]=useState([]);
  const [dataNew, setDataNew]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalInsertarNuevo, setModalInsertarNuevo]= useState(false);
  const [modalInsertarPayment, setModalInsertarPayment]=useState(false);
  const [modalPagar, setModalPagar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [paymentSeleccionado, setpaymentSeleccionado] = useState({
    id_credi_loan_payment: '',
    credi_loan_code: '',
    client_name: '',
    quota_number:'',
    payment_mount:'',
    id_credi_loan:''
  });
  const [loanSeleccionado, setloanSeleccionado]=useState({
    id_credi_loan: '',
    client_name: '',
    loan_term: '',
    loan_payment:'',
    money_type: '',
    loan_mount:'',
    loan_interest:'',
    loan_line:'',
    loan_total_debth: '',
    selectedDate: new Date(),
    selectedDatePayment: new Date(),
    selectedDatePaymentEnding: new Date(),
    credi_loan_code: ''
  });
  const [client, setClients] = useState([]);
  const [errorRequest, setErrorRequest] = useState(false);
  const {register, watch} = useForm();
  
  useEffect(() => {
		async function fetchInitialData() {
			const response = await getClients();
			response.errors ? setErrorRequest(true) : setClients(response);
		}

		fetchInitialData();
	}, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDatePayment, setSelectedDatePayment]=useState(new Date());
  const [selectedDatePaymentEnding, setSelectedDatePaymentEnding]=useState(new Date());

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

  const operaciones =()=>{
    var ops ={
      TotalDeuda: function TotalDeuda(n1,n2){
        return ((parseInt(n1)*parseInt(n2))+parseInt(n1));
      }
    }
  }

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDatePayment(date);
    setSelectedDatePaymentEnding(date);
  };

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

  const abrirCerrarModalPagar=()=>{
    setModalPagar(!modalPagar);
  }

  const abrirCerrarModalInsertarPayment=()=>{
    setModalInsertarPayment(!modalInsertarPayment);
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

  const peticionGetPayments=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.dataNew);
    }).catch(error=>{
      console.log(error);
    })
  }


  const peticionPost=async()=>{
    var f = new FormData();
    f.append("client_name", loanSeleccionado.client_name);
    f.append("loan_term", loanSeleccionado.loan_term);
    f.append("loan_payment", loanSeleccionado.loan_payment);
    f.append("money_type", loanSeleccionado.money_type);
    f.append("loan_mount", loanSeleccionado.loan_mount);
    f.append("loan_interest", loanSeleccionado.loan_interest);
    f.append("loan_line", loanSeleccionado.loan_line);
    f.append("selectedDate", loanSeleccionado.selectedDate);
    f.append("selectedDatePayment", loanSeleccionado.selectedDatePayment);
    f.append("selectedDatePaymentEnding", loanSeleccionado.selectedDatePaymentEnding);
    f.append("credi_loan_code", loanSeleccionado.credi_loan_code);
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

  const peticionPostPayment=async()=>{
    var f = new FormData();
    f.append("client_name", paymentSeleccionado.client_name);
    f.append("client_second_name", clientSeleccionado.client_second_name);
    f.append("client_middle_name", clientSeleccionado.client_middle_name);
    f.append("client_last_name", clientSeleccionado.client_last_name);
    f.append("client_national_id", clientSeleccionado.client_national_id);
    f.append("METHOD", "POST");
    await axios.post(baseUrl2, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertarNuevo();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id_credi_loan: loanSeleccionado.id_credi_loan}})
    .then(response=>{
      setData(data.filter(loan=>loan.id_credi_loan!==loanSeleccionado.id_credi_loan));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarloan=(credi_loan, caso)=>{
    setloanSeleccionado(credi_loan);

    (caso==="Editar")?
    abrirCerrarModalPagar():
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
          <th>Codigo del Prestamo</th>
          <th>Cliente</th>
          <th>Tipo de Moneda</th>
          <th>Monto</th>
          <th>Interes %</th>
          <th>Linea del Prestamo</th>
          <th>Prestamo realizado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((credi_loan, index)=>(
          <tr key={index}>
            <td>{credi_loan.credi_loan_code}</td>
            <td>{credi_loan.client_name}</td>
            <td>{credi_loan.money_type}</td>
            <td>{credi_loan.loan_mount}</td>
            <td>{credi_loan.loan_interest}</td>
            <td>{credi_loan.loan_line}</td>
            <td>{credi_loan.loan_total_debth}</td>
          <td>
          <Controls.Button
                        type = "submit"
                        text = "Pagar"
                        /*color = "default"*/
                        onClick = {()=>seleccionarloan(credi_loan, "Editar")}
                    /> {"  "}
                    <Controls.Button
                        text = "Eliminar"
                        color = "default"
                        onClick = {()=>seleccionarloan(credi_loan, "Eliminar")}
                    />
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
                        {/*<label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_name" onChange = {handleChange}/>
                            <span>Cliente</span>
                        </label>
        <br/>*/}
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "credi_loan_code" onChange = {handleChange}/>
                            <span>Codigo del Prestamo</span>
                        </label>
                        <br/>
                        <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={state.client_Name}
                              name="client_name"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'loan_client' }}
                            >
                              <option value="" disabled>
                                Cliente
                              </option>
                              {client.map((value)=>(
                                <option value = {value.client_name} key = {value.id_credi_client}>
                                  {value.client_first_name}{' '}{value.client_middle_name}
                                </option>
                              ))}
                              
                            </NativeSelect>
                            <FormHelperText>Cliente del Prestamo</FormHelperText>
                          </FormControl>
                        </div>
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
                              <option id = "1" value={'1'}>Diario</option>
                              <option id = "2" value={'1.5'}>Dia de por medio</option>
                              <option id = "3" value={'7'}>Semanal</option>
                              <option id = "4" value={'15'}>Quincenal</option>
                              <option id = "5" value={'30'}>Mensual</option>
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          name= "selectedDate"
                          margin="normal"
                          id="date-picker-dialog"
                          label="Fecha de Entrega del Préstamo"
                          format="MM/dd/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider> 
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          name="selectedDatePayment"
                          margin="normal"
                          id="date-picker-dialog"
                          label="Fecha de Inicio de Pago"
                          format="MM/dd/yyyy"
                          value={selectedDatePayment}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>                                
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                    <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          name="selectedDatePaymentEnding"
                          margin="normal"
                          id="date-picker-dialog"
                          label="Fecha Final de Pago"
                          format="MM/dd/yyyy"
                          value={selectedDatePaymentEnding}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    </div>
                    <div>
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
                    </div>      
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
    <Modal isOpen={modalPagar} contentClassName = "custom-modal-style-client">
      <ModalHeader>Realizar Pago</ModalHeader>
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertarPayment()}>Realizar pago</button>
      <ModalBody>
          <div>
            <table className="table table-striped"> 
              <thead>
                <tr>
                  <th>Codigo del Prestamo</th>
                  <th>Cliente</th>
                  <th>Número de Cuota</th>
                  <th>Monto de la Cuota</th>
                  <th>ID del Prestamo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
            <tbody>
            {dataNew && dataNew.map((loan_payment, index)=>(
            <tr key={index}>
                <td>{loan_payment.credi_loan_code}</td>
                <td>{loan_payment.client_name}</td>
                <td>{loan_payment.quota_number}</td>
                <td>{loan_payment.payment_mount}</td>
                <td>{loan_payment.id_credi_loan}</td>
              <td>
                {/*<Controls.Button
                  type = "submit"
                  text = "Pagar"
                  /*color = "default"
                  onClick = {()=>seleccionarloan(credi_loan, "Editar")}
                  /> {"  "}
                <Controls.Button
                  text = "Eliminar"
                  color = "default"
                  onClick = {()=>seleccionarloan(credi_loan, "Eliminar")}
                />*/}
              </td>
            </tr>
            ))}
            </tbody> 
          </table>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalPagar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalInsertarPayment} contentClassName = "custom-modal-style-payment">
      <ModalHeader>Registrar Pago</ModalHeader>
      <ModalBody>
            <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">           
                        <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={loanSeleccionado.client_name}
                              name="client_name"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'loan_client' }}
                            >
                              <option value="" disabled>
                                Cliente
                              </option>
                              {client.map((value)=>(
                                <option value = {value.client_name} key = {value.id_credi_client}>
                                  {value.client_first_name}{' '}{value.client_middle_name}
                                </option>
                              ))}
                            </NativeSelect>
                            <FormHelperText>Cliente del Prestamo</FormHelperText>
                          </FormControl>
                        </div>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "credi_loan_code" onChange = {handleChange} value = {loanSeleccionado.credi_loan_code}/>
                            <span>Codigo del Prestamo</span>
                        </label>
                        <br/>
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "quota_number" onChange = {handleChange}/>
                            <span>Numero de Cuota</span>
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "payment_mount" onChange = {handleChange}/>
                            <span>Monto pagado</span>
                        </label>
                        <br/>
                    </div>                              
                </Grid>
            </Grid>
      </ModalBody>
      <ModalFooter>
        <Controls.Button
                        /*type = "submit"*/
                        text = "Insertar"
                        /*color = "default"*/
                        onClick = {()=>peticionPostPayment()}
                    /> {"  "}
          <Controls.Button
                        text = "Cancelar"
                        color = "secondary"
                        onClick = {()=>abrirCerrarModalInsertarPayment()}
                    />
      </ModalFooter>
    </Modal>
    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Prestamo {loanSeleccionado && loanSeleccionado.client_name}?
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

export default Loan;