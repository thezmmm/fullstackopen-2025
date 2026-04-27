import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const NotFound = ({ message = 'Page not found' }) => {
  const navigate = useNavigate()

  return (
    <div className="text-center mt-5">
      <h2 className="text-muted">404 — {message}</h2>
      <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>
        go to home
      </Button>
    </div>
  )
}

export default NotFound
