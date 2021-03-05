
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