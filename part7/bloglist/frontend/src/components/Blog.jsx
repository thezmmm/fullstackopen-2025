import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Button, ListGroup } from 'react-bootstrap'
import blogService from '../services/blogService'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.user)

  const likeMutation = useMutation({
    mutationFn: (b) => blogService.update(b.id, { ...b, likes: b.likes + 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const removeMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const handleLike = () => likeMutation.mutate(blog)

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeMutation.mutate(blog.id)
    }
  }

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        <Link to={`/blogs/${blog.id}`} className="fw-semibold">
          {blog.title}
        </Link>
        <span className="text-muted ms-2">by {blog.author}</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Button variant="outline-primary" size="sm" onClick={handleLike}>
          ♥ {blog.likes}
        </Button>
        {user?.username === blog.user?.username && (
          <Button variant="outline-danger" size="sm" onClick={handleRemove}>
            remove
          </Button>
        )}
      </div>
    </ListGroup.Item>
  )
}

export default Blog
