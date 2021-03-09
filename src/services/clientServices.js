
const KEYS = {
    client: 'client',
    clientID: 'ID_Client'
}

export const getPersonCollection = () => ([
    {id: '1', title: 'Administrador'},
    {id: '2', title: 'Asistente'},
]);


export function insertClient(data){
    let client = getAllClients();
    data['id'] = generateClientID()
    client.push(data)
    localStorage.setItem('client', JSON.stringify(client))
}

export function generateClientID(){
    if(localStorage.getItem(KEYS.clientID) == null)
        localStorage.setItem(KEYS.clientID, '0')
    var id = parseInt(localStorage.getItem(KEYS.clientID))
    localStorage.setItem(KEYS.clientID, (++id).toString())
    return id;
}

export function getAllClients(){
    if(localStorage.getItem(KEYS.client) == null)
        localStorage.setItem(KEYS.client, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.client));
}

export const getLines = () => ([
    {id: '1', title: 'Huembes'},
    {id: '2', title: 'Oriental'},
    {id: '3', title: 'Montetabor'},
    {id: '4', title: 'TICOMO'},
    {id: '5', title: 'San Jose O.'},
    {id: '6', title: 'Cuajachillo'},
    {id: '7', title: 'Ciudad Sandino'},
    {id: '8', title: 'Villa Reconciliacion'},
    {id: '9', title: 'Bello Amanecer 1'},
    {id: '10', title: 'Bello Amanecer 2'},
    {id: '11', title: 'Bello Amanecer 3'},
    {id: '12', title: 'Bello Amanecer 4'},
    {id: '13', title: 'Los Brasiles'},
]);