import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import userService from '../services/userService'

const UserView = () => {
  const { id } = useParams()
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  })

  if (isLoading) return <div>loading...</div>

  const user = users?.find(u => u.id === id)
  if (!user) return <div>user not found</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
