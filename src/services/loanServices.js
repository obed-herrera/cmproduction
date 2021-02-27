import { LocalLaundryService } from "@material-ui/icons";

const KEYS = {
    loan: 'loan',
    loanID: 'ID_Loan'
}

export const getClientCollection = () => ([
    {id: '1', title: 'Juan Dominguez'},
    {id: '2', title: 'Pedro Espinoza'},
    {id: '3', title: 'Anielka Rojas'},
    {id: '4', title: 'Debora Nicaragua'},
    {id: '5', title: 'Jose Herrera'},
    {id: '6', title: 'Kenia Aguirre'},
]);
export const getLoanTerms = () => ([
    {id: '1', title: '2 Meses'},
    {id: '2', title: '3 Meses'},
    {id: '3', title: '4 Meses'},
    {id: '4', title: '5 Meses'},
    {id: '5', title: '6 Meses'},
]);

export const getPersonCollection = () => ([
    {id: '1', title: 'Administrador'},
    {id: '2', title: 'Asistente'},
]);

export const getEmployeeType = ()=>([
    {id: '1', title: 'Cobrador'},
    {id: '2', title: 'Administrador'},
    {id: '3', title: 'Contador'},
])

export function insertLoan(data){
    let employee = getAllEmployees();
    data['id'] = generateEmployeeID()
    employee.push(data)
    localStorage.setItem('employee', JSON.stringify(employee))
}

export function generateEmployeeID(){
    if(localStorage.getItem(KEYS.employeeID) == null)
        localStorage.setItem(KEYS.employeeID, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeID))
    localStorage.setItem(KEYS.employeeID, (++id).toString())
    return id;
}

export function getAllEmployees(){
    if(localStorage.getItem(KEYS.employee) == null)
        localStorage.setItem(KEYS.employee, JSON.stringify([]))
    let employee = JSON.parse(localStorage.getItem(KEYS.employee));

    let Employee_Type = getEmployeeType();
    return employee.map(x=>({
        ...x, 
        EmployeeT : Employee_Type[x.Employee_Type-1].title 
    }))
}