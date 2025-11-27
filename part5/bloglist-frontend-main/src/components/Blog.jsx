import {useState} from "react";
import blogService from "../services/blogService.js";

const Blog = ({ blog }) => {

  const [visable, setVisable] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleView = () => {
      setVisable(!visable)
  }

  const handleLike = async () => {
      const updatedBlog = {
            ...blog,
            likes: likes + 1
      }
      await blogService.update(blog.id, updatedBlog)
      setLikes(likes + 1)
  }

  const handleRemove = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.remove(blog.id)
            window.location.reload()
        }
  }

  return (
      <div>
        <h2>{blog.title}<button onClick={handleView}>view</button></h2>
        <div style={{ display: visable ? '' : 'none' }}>
            <p>{blog.url}</p>
            <p>{likes} likes <button onClick={handleLike}>like</button></p>
            <p>{blog.author}</p>
            <button onClick={handleRemove}>remove</button>
        </div>
      </div>
  )
}
export default Blog