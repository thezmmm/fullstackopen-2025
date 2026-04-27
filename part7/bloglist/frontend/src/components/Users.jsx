import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Table, Spinner } from 'react-bootstrap'
import userService from '../services/userService'

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) return <Spinner animation="border" size="sm" />

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
