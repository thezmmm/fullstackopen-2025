import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import blogService from '../services/blogService'
import { notify } from '../reducers/notificationReducer'
import useField from '../hooks/useField'

const CreateBlogForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch(notify(`a new blog ${newBlog.title} by ${newBlog.author} added`))
      title.reset()
      author.reset()
      url.reset()
    },
    onError: () => dispatch(notify('failed to create blog', 'error')),
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    createMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    })
  }

  const { reset: _rt, ...titleProps } = title
  const { reset: _ra, ...authorProps } = author
  const { reset: _ru, ...urlProps } = url

  return (
    <div>
      <h4>Create new</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>title</Form.Label>
          <Form.Control {...titleProps} name="title" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>author</Form.Label>
          <Form.Control {...authorProps} name="author" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url</Form.Label>
          <Form.Control {...urlProps} name="url" />
        </Form.Group>
        <Button type="submit" variant="success" size="sm">
          create
        </Button>
      </Form>
    </div>
  )
}

export default CreateBlogForm
