import { createContext, useContext, useReducer, useEffect } from 'react'
import blogService from '../services/blogService'
import storageService from '../services/storageService'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const loggedUser = storageService.getUser()
    if (loggedUser) {
      dispatch({ type: 'SET', payload: loggedUser })
      blogService.setToken(loggedUser.token)
    }
  }, [])

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext)
  return dispatch
}
