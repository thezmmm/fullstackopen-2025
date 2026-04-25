import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'
import blogService from '../services/blogService'

const BlogList = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <h2>blogs</h2>
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
