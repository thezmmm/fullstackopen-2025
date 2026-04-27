import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import storageService from '../services/storageService'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
})

export const { setUser, clearUser } = userSlice.actions

export const initUser = () => (dispatch) => {
  const user = storageService.getUser()
  if (user) {
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const login = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  storageService.saveUser(user)
  blogService.setToken(user.token)
  dispatch(setUser(user))
}

export const logout = () => (dispatch) => {
  storageService.removeUser()
  blogService.setToken(null)
  dispatch(clearUser())
}

export default userSlice.reducer
