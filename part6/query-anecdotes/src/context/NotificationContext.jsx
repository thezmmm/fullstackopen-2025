import {createContext, useContext, useReducer} from 'react'
import notificationReducer from "../reducer/notificationReducer.js";

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)

    const showNotification = (message, duration = 5000) => {
        dispatch({ type: 'SET_NOTIFICATION', payload: message })

        setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, duration)
    }

    return (
        <NotificationContext.Provider value={{ notification, showNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext)
export default NotificationContext