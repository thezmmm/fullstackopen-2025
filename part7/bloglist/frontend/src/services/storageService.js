const getUser = () => {
  const userString = window.localStorage.getItem('user')
  return userString ? JSON.parse(userString) : null
}

const saveUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem('user')
}

export default { getUser, saveUser, removeUser }
