import axios from 'axios';
import { getEnvVariables } from '../helpers';

// inicializamos la variable con la cadena de conexion a la base de datos
const {VITE_API_URL} = getEnvVariables();

const calendarApi = axios.create({
    baseURL:VITE_API_URL

});

//TODO: configurar interceptores
calendarApi.interceptors.request.use(config  =>{

    config.headers= {
        ...config.headers,
        'x-token': localStorage.getItem('token')
        
    }

    return config;

}
)

export default calendarApi;