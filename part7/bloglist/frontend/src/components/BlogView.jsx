import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Button, Form, ListGroup, Badge, Spinner } from 'react-bootstrap'
import blogService from '../services/blogService'
import useField from '../hooks/useField'
import NotFound from './NotFound'

const BlogView = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const comment = useField('text')

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const likeMutation = useMutation({
    mutationFn: (blog) =>
      blogService.update(blog.id, { ...blog, likes: blog.likes + 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const commentMutation = useMutation({
    mutationFn: ({ blogId, text }) => blogService.addComment(blogId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      comment.reset()
    },
  })

  if (isLoading) return <Spinner animation="border" size="sm" />

  const blog = blogs?.find((b) => b.id === id)
  if (!blog) return <NotFound message="Blog not found" />

  const handleLike = () => likeMutation.mutate(blog)

  const handleAddComment = (event) => {
    event.preventDefault()
    commentMutation.mutate({ blogId: blog.id, text: comment.value })
  }

  const { reset: _r, ...commentProps } = comment

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </p>
      <p>
        <Badge bg="secondary" className="me-2">
          {blog.likes} likes
        </Badge>
        <Button variant="outline-primary" size="sm" onClick={handleLike}>
          ♥ like
        </Button>
      </p>
      <p className="text-muted">added by {blog.user?.name}</p>

      <h4 className="mt-4">comments</h4>
      <Form onSubmit={handleAddComment} className="d-flex gap-2 mb-3">
        <Form.Control {...commentProps} placeholder="add a comment..." />
        <Button type="submit" variant="primary" size="sm">
          add
        </Button>
      </Form>
      <ListGroup>
        {blog.comments?.map((c, i) => (
          <ListGroup.Item key={i}>{c}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default BlogView
