import { addHours, constructFrom } from 'date-fns';
import{useCalendarStore, useUiStore} from '../../hooks'

// Aca estamos creando el handle para agregar un nuevo evento usando redux tolking
export const FabAddNew = () => {
   
  const {openDateModal} = useUiStore();
  const {setActiveEvent} = useCalendarStore();

  const handleClickNew = () =>{
    setActiveEvent({
      title: '',
      notes: '',
      status: '',
      start: new Date(),
      end: addHours(new Date(),1),
      bgColor: '#342f31',
      user:{
        _id: '123',
        name: 'Hector',
  }

    })
    openDateModal();

  }

  return (
    <button className="btn btn-primary fab"
    onClick={handleClickNew}
    >
    
        <i className="fas fa-plus"></i>
    </button>
  )
}
