import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
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
    <div
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        marginBottom: '8px',
        borderRadius: '4px',
      }}
    >
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}{' '}
      <button onClick={handleLike}>like ({blog.likes})</button>
      {user?.username === blog.user?.username && (
        <button onClick={handleRemove} style={{ marginLeft: '8px' }}>
          remove
        </button>
      )}
    </div>
  )
}

export default Blog
