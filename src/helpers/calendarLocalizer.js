
import { dateFnsLocalizer } from 'react-big-calendar'
import { format,parse,startOfWeek,getDay } from 'date-fns'
import esES from 'date-fns/locale/es'

//Este localizer nos ayuda a cambiar el idioma, y obtener propiedades como el formato el parse. . .
const locales = {
    'es': esES,
  }

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
