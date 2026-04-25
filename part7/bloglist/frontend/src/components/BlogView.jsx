import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogService'
import useField from '../hooks/useField'

const BlogView = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const comment = useField('text')

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const likeMutation = useMutation({
    mutationFn: (blog) => blogService.update(blog.id, { ...blog, likes: blog.likes + 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] })
  })

  const commentMutation = useMutation({
    mutationFn: ({ blogId, text }) => blogService.addComment(blogId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      comment.reset()
    }
  })

  if (isLoading) return <div>loading...</div>

  const blog = blogs?.find(b => b.id === id)
  if (!blog) return <div>blog not found</div>

  const handleLike = () => likeMutation.mutate(blog)

  const handleAddComment = (event) => {
    event.preventDefault()
    commentMutation.mutate({ blogId: blog.id, text: comment.value })
  }

  const { reset: _r, ...commentProps } = comment

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
      <p>added by {blog.user?.name}</p>

      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input {...commentProps} placeholder="add a comment..." />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments?.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}

export default BlogView
