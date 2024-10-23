import { addHours, differenceInSeconds } from 'date-fns';
import { useState,useMemo, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useCalendarStore, useUiStore } from '../../hooks';
import 'bootstrap/dist/css/bootstrap.min.css'
import Select from 'react-select'



registerLocale('es', es)
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');


export const CalendarModal = () => {
    
    const { isDateModalOpen, closeDateModal} = useUiStore();
    const {activeEvent,startSavingEvent}= useCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);








    // Ejemplo de como dber cargarse el modal
const [formValues, setFormValues] = useState(
    {
        title: 'Hector',
        notes: 'Preuba',
        status: 'Pendiente',
        priority:'Alta',
        start: new Date(),
        end: addHours(new Date(),)
    });

    // validamos si el evento tiene un titulo para poder guardarlo
const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return (formValues.title.length > 0)
    ? 'is-valid'
    : 'is-invalid';

},[formValues.title, formSubmitted])

useEffect(() => {
  if(activeEvent !== null){
    setFormValues({...activeEvent})
  }

  
}, [activeEvent])



const onInputChange = ({target})=>{

    setFormValues({
        ...formValues,
        [target.name]: target.value
    })

}

const onDateChanged = (event,changing)=>{
    setFormValues({
        ...formValues,
        [changing]:event
    })


}

const onSelectStatusChange = (e) =>{
    setFormValues({
        ...formValues,
        ["status"]: e.value,
})
}

const onSelectPriorityChange = (e) =>{
    setFormValues({
        ...formValues,
         ["priority"]:e.value
})
}

    const onCloseModal = ()=>{
        closeDateModal();
        }

  
  
  // validamos si los eventos tuvieron cambios, validamos las fechas, guardamos el evento
  const onSubmit =async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // comparamos los eventos si son iguales o tienen diferencias
        const difference = differenceInSeconds(formValues.end, formValues.start)
        
        if (isNaN(difference)|| difference<=0){
            Swal.fire('Fechas Incorrectas','Revisar las fechas ingresadas','error')
            return; 
        }
        if (formValues.title.length<=0)return

        // guardamos el evento
        await startSavingEvent(formValues);
        // cerramos el modal
        closeDateModal();
        // limpiamos el from
        setFormSubmitted(false);


  }

  // prioridades para el evento
  const optionsPriority = [
    { value: 'Alta', label: 'Alta' },
    { value: 'Media', label: 'Media' },
    { value: 'Baja', label: 'Baja' }
  ]
  // estatus del evento
  const optionsStatus = [
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'En Proceso', label: 'En Proceso' },
    { value: 'Terminado', label: 'Terminado' }
  ]
 

  // renderizamos el modal con un useEffect para que carga el evento seleccionado 
  useEffect(() => {
    });
    return (
        <Modal 
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className = "modal"
            // overlayClassName="moodal-fondo"
        >       

            <h1> Nueva Tarea </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <br />
                    <DatePicker
                    selected={formValues.start}
                    onChange={(event) => onDateChanged(event,'start')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                <br />

                    <DatePicker
                    minDate={formValues.start}
                    selected={formValues.end}
                    onChange={(event) => onDateChanged(event,'end')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo</label>
                    <input 
                        type="text" 
                        className={` form-control ${titleClass}` }
                        placeholder="Título "
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange ={onInputChange}
                    />
                    <label>Estado</label>
                    <Select
                            options={optionsStatus}
                            onChange={(event) => onSelectStatusChange(event)}
                            value={optionsStatus.find(option => option.value === formValues.status)} // valor por defecto
                            />
                   
                  
                     <label>Prioridad</label>

                            <Select
                            options={optionsPriority}
                            onChange={(event) => onSelectPriorityChange(event)}
                            value={optionsPriority.find(option => option.value === formValues.priority)} // valor por defecto
                            />                                    
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control "
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange ={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
  )

  
}
