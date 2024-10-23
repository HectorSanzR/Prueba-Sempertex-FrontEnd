import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarApp } from './CalendarApp.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  
  //Componente renderizado "CalendarApp"
  
  <StrictMode>
   <CalendarApp/>
  </StrictMode>,
)
