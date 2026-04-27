import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initUser } from './reducers/userReducer'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserView from './components/UserView'
import NotFound from './components/NotFound'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Togglable buttonLabel="create new blog">
                  <CreateBlogForm />
                </Togglable>
                <BlogList />
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
