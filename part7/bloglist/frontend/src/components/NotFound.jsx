import { useNavigate } from 'react-router-dom'

const NotFound = ({ message = 'Page not found' }) => {
  const navigate = useNavigate()

  return (
    <div>
      <h2>404 — {message}</h2>
      <button onClick={() => navigate('/')}>go to home</button>
    </div>
  )
}

export default NotFound