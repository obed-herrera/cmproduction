import { LocalLaundryService } from "@material-ui/icons";

const KEYS = {
    employee: 'employee',
    ID_Employee: 'ID_Employee'
}

export const getPersonCollection = () => ([
    {id: '1', title: 'Administrador'},
    {id: '2', title: 'Asistente'},
]);

export const getEmployeeType = ()=>([
    {id: '1', title: 'Cobrador'},
    {id: '2', title: 'Administrador'},
    {id: '3', title: 'Contador'},
])

export function insertEmployee(data){
    let employee = getAllEmployees();
    data['id'] = generateEmployeeID();
    employee.push(data)
    localStorage.setItem('employee', JSON.stringify(employee))
}

export function generateEmployeeID(){
    if(localStorage.getItem(KEYS.ID_Employee)==null)
        localStorage.setItem(KEYS.ID_Employee, '0')
    var id = parseInt(localStorage.getItem(KEYS.ID_Employee))
    localStorage.setItem(KEYS.ID_Employee, (++id).toString())
    return id;
}

export function getAllEmployees(){
    if(localStorage.getItem(KEYS.employee)==null)
        localStorage.setItem(KEYS.employee, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.employee));
}