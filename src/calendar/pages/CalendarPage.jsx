import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar,CalendarEvent, FabAddNew, FabDelete} from "../"

// import enUS from 'date-fns/locale/en-US'
import { localizer,getMessagesEs} from '../../helpers'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore,useCalendarStore, useAuthStore } from '../../hooks'
import { useEffect } from 'react'




export const CalendarPage = () => {

const {user}=useAuthStore()
const{openDateModal} = useUiStore();
  
const {events,setActiveEvent,startLoadingEvents} = useCalendarStore()


const eventStyleGetter = (event,star,end,isSelected) =>{
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    
    const style = {
      backgroundColor: isMyEvent ? '#647CF7':'#465660',
      // onclick : '#647CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      // outline: none,
      
    
    }
    return{style}

  }

  //funcion creada para la accion de dobleClick
  const onDoubleClick =(event) =>{
    // Hace el llamado al modal para que cargue los datos seleccionados
    openDateModal();
  }

  const onSelect =(event) =>{
 
    setActiveEvent(event);
  }

  const onViewChanged =(event) =>{
    // console.log({viewChanged: event})
  }
  
  useEffect(() => {
    startLoadingEvents()
    
    
  }, [])
  

  return (
    <>
      {/* aqui renterizamos el nadvar en la pagina de CalendarPage */}
    <Navbar/>
    <Calendar
      // busca el objeto creado helpers/calendarLocalizer
      culture='es'
      // Localizer exportado desde los helpers/calendarLocalizer
      localizer={localizer}
      // Aqui se mandan los eventos
      events={events} 
      defaultView = "agenda"
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      // Invocamos la funcion creada en helpers/getMessagesEs
      messages={getMessagesEs()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}

      onDoubleClickEvent ={onDoubleClick}
      onSelectEvent = {onSelect}
      onView = {onViewChanged}

    />
  <CalendarModal/>
  <FabAddNew/>
  <FabDelete/>
    </>
  )
}
