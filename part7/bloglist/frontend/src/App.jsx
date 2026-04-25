import { Routes, Route } from 'react-router-dom'
import { useUserValue } from './contexts/UserContext'
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

const App = () => {
  const user = useUserValue()

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
          <Route path="/" element={
            <div>
              <Togglable buttonLabel="create new blog">
                <CreateBlogForm />
              </Togglable>
              <BlogList />
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
