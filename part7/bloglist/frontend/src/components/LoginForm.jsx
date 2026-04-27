import loginService from '../services/loginService'
import blogService from '../services/blogService'
import storageService from '../services/storageService'
import { useNotify } from '../contexts/NotificationContext'
import { useUserDispatch } from '../contexts/UserContext'
import useField from '../hooks/useField'

const LoginForm = () => {
  const notify = useNotify()
  const dispatch = useUserDispatch()
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      storageService.saveUser(user)
      blogService.setToken(user.token)
      dispatch({ type: 'SET', payload: user })
    } catch {
      notify('wrong username or password', 'error')
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
