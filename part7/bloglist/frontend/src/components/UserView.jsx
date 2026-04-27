import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { ListGroup, Spinner } from 'react-bootstrap'
import userService from '../services/userService'
import NotFound from './NotFound'

const UserView = () => {
  const { id } = useParams()
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) return <Spinner animation="border" size="sm" />

  const user = users?.find((u) => u.id === id)
  if (!user) return <NotFound message="User not found" />

  return (
    <div>
      <h2>{user.name}</h2>
      <h4 className="mt-3 mb-2">added blogs</h4>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default UserView
