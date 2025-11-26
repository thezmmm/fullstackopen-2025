import { useState, useEffect } from 'react'
import blogService from './services/blogService.js'
import BlogForm from "./components/BlogForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import CreateBlogForm from "./components/CreateBlogForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        const userString = window.localStorage.getItem('user')
        if (userString) {
            const user = JSON.parse(userString)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [notification])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [user])

  const handleLogout = () => {
      window.localStorage.removeItem('user')
      setUser(null)
      blogService.setToken(null)
  }

  if (user === null) {
    return (
        <div>
            <Notification message={notification}/>
            <LoginForm setUser={setUser} setNotification={setNotification}/>
        </div>
    )
  }
  return (
      <div>
          <Notification message={notification}/>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <CreateBlogForm addBlog = {(newBlog)=>setBlogs([...blogs, newBlog])} setNotification={setNotification}/>
          <BlogForm blogs={blogs}/>
      </div>
  )
}

export default App