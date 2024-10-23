import {useSelector,useDispatch} from 'react-redux'
import { CalendarEvent } from '../calendar'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent,onLoadEvent } from '../store'
import { calendarApi } from '../api'
import { convertTareasToDateTareas } from '../helpers'
import Swal from 'sweetalert2'
export const useCalendarStore = () => {
    const dispatch = useDispatch()



    const {events,activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)

    
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }
    
    //se define si es un evento nuevo o uno que ya existe.
    const startSavingEvent=async(calendarEvent)=>{
        //TODO: update event


       try {
        if (calendarEvent.id){
            //Actualia la tarea
            // con el ... aseguramos que mandamos uno nuevo

           await calendarApi.put(`/tareas/${calendarEvent.id}`,calendarEvent)
            dispatch(onUpdateEvent({...calendarEvent,user}));
            return;

        }
            const {data} = await calendarApi.post('/tareas',calendarEvent)
            console.log({data})
            dispatch(onAddNewEvent({...calendarEvent, id: data.tarea.id, user}))
        
       } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error')
        
       }

        

    }

    //funcion para borrar la tarea
    const startDeletingEvent = async()=>{

       
        try {
            await calendarApi.delete(`/tareas/${activeEvent.id}`)
            dispatch(onDeleteEvent());
            
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
    }


    const startLoadingEvents = async() => {	
        try {

            const{data} = await calendarApi.get('/tareas')
            const tareas = convertTareasToDateTareas(data.tareas)
            dispatch(onLoadEvent (tareas))

        } catch (error) {
            console.log('Error cargando tareas');
            console.log(error);
            
        }
    };

    return {
        
        //Propiedades
        activeEvent,
        events,
             //pregunto si tiene una nota activa para esconder el boton de borrar
        hasEventSelected:!!activeEvent,

        //Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
        




    }
}
