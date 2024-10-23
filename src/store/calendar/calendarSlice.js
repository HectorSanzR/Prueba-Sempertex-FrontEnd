import { createSlice } from '@reduxjs/toolkit';


// aca se crean los redux

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
        ],
        activeEvent: null
    },
    reducers: {
     onSetActiveEvent: (state,{payload}) =>{
        state.activeEvent = payload;
     },
     onAddNewEvent: (state,{payload})=>{
        state.events.push(payload);
        state.activeEvent = null;
     },
     onUpdateEvent: (state,{payload}) =>{
        
        state.events = state.events.map(event =>{
            if (event.id === payload.id){
                return payload;
            }
            return event;
        });


     },
     onDeleteEvent: (state) =>{
        // si no tiene una tarea seleccionada no se ejecuta la accion de borrar 
        if (state.activeEvent){
            // filtro la tarea por  _id
            state.events = state.events.filter(event => event.id !== state.activeEvent.id)
            state.activeEvent = null
        }
        
     },
     onLoadEvent: (state,{payload = []}) =>{
        state.isLoadingEvents = false;
        // state.tareas = payload
        payload.forEach(event => {
            const exists = state.events.some(dbEvent => dbEvent.id === event.id);
            if(!exists){
                state.events.push(event)
            }
        })
     },

     onLogoutCalendar: (state) =>{
        state.isLoadingEvents= true,
       state.events= [],
        state.activeEvent= null

     }

    }
});
export const { onSetActiveEvent,
                onAddNewEvent,
                onUpdateEvent,
                onDeleteEvent,
                onLoadEvent,
                onLogoutCalendar } = calendarSlice.actions;