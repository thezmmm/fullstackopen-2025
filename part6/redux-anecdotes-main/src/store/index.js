import {configureStore} from "@reduxjs/toolkit"
import anecdoteReducer from "../reducers/anecdoteSlice.js"
import notificationReducer from "../reducers/notificationSlice.js"
import filterReducer from "../reducers/filterSlice.js"

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})

export default store