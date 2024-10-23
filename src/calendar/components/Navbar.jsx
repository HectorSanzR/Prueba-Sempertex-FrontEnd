import { useAuthStore } from "../../hooks/useAuthStore"
import "./style.css"


export const Navbar = () => {

  const {startLogout,user} = useAuthStore();

  //Renderizamos el Nadvar 
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4 navbar-custom " >
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            {/* esto hace una separacion pequeña */}
            &nbsp; 
            {/* Pasamos el Nombre del usuario que esta logueado */}
            {user.name}
        </span>

        <button 
          className="btn btn-outline-danger"
          onClick={startLogout}
          >
          <i className="fas fa-sign-out-alt"></i>
          &nbsp;
          <span>Salir</span>
        </button>
    </div>    
  )
}
