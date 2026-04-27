import { useDispatch } from 'react-redux'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Log in to application</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>username</Form.Label>
                  <Form.Control {...usernameProps} name="username" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>password</Form.Label>
                  <Form.Control {...passwordProps} name="password" />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
