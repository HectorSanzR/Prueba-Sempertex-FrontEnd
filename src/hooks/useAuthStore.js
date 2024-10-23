import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onlogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = ()=>{
 
    const {status,user,errorMessage} = useSelector (state =>state.auth)
    const dispatch = useDispatch();


    const startLogin = async ({email,password}) =>{

        dispatch(onChecking())

        try {
            
            //se conecta con la vase de dato para registrar al usuario
            const {data} = await calendarApi.post('/auth',{email,password});
            localStorage.setItem('token',data.token)
            localStorage.setItem('token-init-date',new Date().getTime())
            dispatch(onlogin({name: data.name, uid: data.uid}))
            

        } catch (error) {
            dispatch(onLogout('no existen las credenciales'));
            
            setTimeout(() => {
                dispatch(clearErrorMessage())	
                // console.clear()
                
            },10)

        }
    }

    const startRegister = async ({email,password,name}) =>{

        dispatch(onChecking())

        try {
            
            //se conecta con la vase de dato para registrar al usuario
            const {data} = await calendarApi.post('/auth/new',{email,password,name});
            localStorage.setItem('token',data.token)
            localStorage.setItem('token-init-date',new Date().getTime())
            dispatch(onlogin({name: data.name, uid: data.uid}))
            

        } catch (error) {
            
            dispatch(onLogout(error.response.data?.msg || '--'));
            
            setTimeout(() => {
                dispatch(clearErrorMessage())	
                // console.clear()
                
            },10)

        }
    }


    const checkAuthToken = async () => {	
        const token = localStorage.getItem('token')
      if (!token)  return dispatch(onLogout());

      try {
        const {data} = await calendarApi.get('auth/renewtoken');
        localStorage.setItem('token',data.token)
        localStorage.setItem('token-init-date',new Date().getTime())
        dispatch(onlogin({name: data.name, uid: data.uid}))
        
      } catch (error) {
        localStorage.clear()
       dispatch(onLogout()) 
      }
    };


    const startLogout = () => {	

        localStorage.clear()
        dispatch(onLogoutCalendar()) 
        dispatch(onLogout()) 

        
    };



    return{
        //*Propiedades
        user,
        status,
        errorMessage,

        //*Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }

}