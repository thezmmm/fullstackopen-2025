import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify =
  (message, type = 'success', timeout = 3000) =>
  (dispatch) => {
    if (timeoutId) clearTimeout(timeoutId)
    dispatch(setNotification({ message, type }))
    timeoutId = setTimeout(() => dispatch(clearNotification()), timeout)
  }

export default notificationSlice.reducer
