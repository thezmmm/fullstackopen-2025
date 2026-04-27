import { useQuery } from '@tanstack/react-query'
import { ListGroup, Spinner } from 'react-bootstrap'
import Blog from './Blog'
import blogService from '../services/blogService'

const BlogList = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (isLoading) return <Spinner animation="border" size="sm" />

  return (
    <div>
      <h2 className="mb-3">blogs</h2>
      <ListGroup>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </ListGroup>
    </div>
  )
}

export default BlogList
