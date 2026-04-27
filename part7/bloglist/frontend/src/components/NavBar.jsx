import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const NavBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logout())

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
