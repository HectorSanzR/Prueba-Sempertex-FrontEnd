import { Route, Routes,Navigate} from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"

// creamos functional component  para renderizar las paginas 

export const AppRouter = () => {
  // const authStatus = 'no-autenticated'
  const {status, checkAuthToken} = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  
  }, [])
  
  if (status === 'checking'){
    return (
      <h3> Cargando . . . </h3>
    )
  }

     
  
  return (

    // Exportamos Routes de react-router-dom y validamos la autenticacion 
   <Routes>
    {
      // Si status es igual a 'no-authenticated' se mostrara la ruta para el login que seria la pagina inical del proyecto "LoginPage.jsx"
      ( status === 'no-authenticated')
      ?
      (
        <>
              <Route path="/auth/*" element= {<LoginPage/>}/>
              <Route path="/*" element= {<Navigate to="/auth/login"/>}/>
      
        </>
      )
      // Si status es diferente a 'no-authenticated' entonces mostrara la pagina de CalendarPage
      :(
        <>
        <Route path="/" element= {<CalendarPage/>}/>
        <Route path="/*" element= {<Navigate to="/"/>}/>
        </>
      )
     


      
    }

   </Routes>




    
    
  )
}
