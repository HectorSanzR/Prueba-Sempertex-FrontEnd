import{useCalendarStore, useUiStore} from '../../hooks'

// Aca estamos creando el handle para agregar un nuevo evento usando redux tolking
export const FabDelete = () => {
   
  //de la funcion useCalendarStore traigo el deleteEvent y lo ejecuto 
  const {startDeletingEvent, hasEventSelected} = useCalendarStore();

  const handledelete = () =>{
    startDeletingEvent();
   
  }

  return (
    <button className="btn btn-danger fab-danger"
    onClick={handledelete}
    style={
      //controlamos si vemos o no el boron de borrar
      {display:hasEventSelected?'':'none'}
    }
    >
    
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
