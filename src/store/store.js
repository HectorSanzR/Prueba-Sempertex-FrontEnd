import { configureStore } from "@reduxjs/toolkit";
import { authSlice, uiSlice   } from "./";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },

    // confiurar la fehca para que sea tomada sin error o meensaje de warnig
    middleware:(getDefaulMiddleware) => getDefaulMiddleware({
        serializableCheck: false
    })
})
 

