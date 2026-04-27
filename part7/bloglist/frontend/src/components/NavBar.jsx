import { Link } from 'react-router-dom'
import { useUserValue, useUserDispatch } from '../contexts/UserContext'
import blogService from '../services/blogService'
import storageService from '../services/storageService'

const NavBar = () => {
  const user = useUserValue()
  const dispatch = useUserDispatch()

  const handleLogout = () => {
    storageService.removeUser()
    blogService.setToken(null)
    dispatch({ type: 'CLEAR' })
  }

  return (
    <nav style={{ background: '#eee', padding: '10px', marginBottom: '16px' }}>
      <Link to="/" style={{ marginRight: '12px' }}>
        blogs
      </Link>
      <Link to="/users" style={{ marginRight: '12px' }}>
        users
      </Link>
      {user && (
        <span>
          {user.name} logged in
          <button onClick={handleLogout} style={{ marginLeft: '8px' }}>
            logout
          </button>
        </span>
      )}
    </nav>
  )
}

export default NavBar
