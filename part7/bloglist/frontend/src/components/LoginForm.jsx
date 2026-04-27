import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import useField from '../hooks/useField'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username: username.value, password: password.value }))
    } catch {
      dispatch(notify('wrong username or password', 'error'))
    }
  }

  const { reset: _ru, ...usernameProps } = username
  const { reset: _rp, ...passwordProps } = password

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input {...usernameProps} name="username" />
          </label>
        </div>
        <div>
          <label>
            password
            <input {...passwordProps} name="password" />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
