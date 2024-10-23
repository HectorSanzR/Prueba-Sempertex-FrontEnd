
export const CalendarEvent = ({event}) => {
      
  
    // los eventos deben tener obligatoriamente estos atributos
      const {title,user,status,notes,priority} = event;

      // esta es la forma en la que se imprimen los ventos 
  return (
    <>
    <strong>Titulo: {title} | </strong>
    <span>-Asignado a : {user.name} | </span>
    <span>Tarea: {notes} | </span>
    <strong>Estado: {status} | </strong>
    <strong>Prioridad: {priority} </strong>
    </>
  )
}
