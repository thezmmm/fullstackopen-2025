import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

const NavBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logout())

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Bloglist
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            users
          </Nav.Link>
        </Nav>
        {user && (
          <Navbar.Text className="d-flex align-items-center gap-2">
            {user.name} logged in
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              logout
            </Button>
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  )
}

export default NavBar
