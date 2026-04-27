import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogService'
import { useNotify } from '../contexts/NotificationContext'
import useField from '../hooks/useField'

const CreateBlogForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      title.reset()
      author.reset()
      url.reset()
    },
    onError: () => notify('failed to create blog', 'error'),
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
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title <input {...titleProps} name="title" />
          </label>
        </div>
        <div>
          <label>
            author <input {...authorProps} name="author" />
          </label>
        </div>
        <div>
          <label>
            url <input {...urlProps} name="url" />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
