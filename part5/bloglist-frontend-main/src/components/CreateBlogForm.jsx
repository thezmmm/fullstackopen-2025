import blogService from "../services/blogService.js";
import {useState} from "react";
import Togglable from "./Togglable.jsx";

const CreateBlogForm = ({addBlog, setNotification}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        // Logic to create a new blog using title, author, and url
        const newBlog = {
            title,
            author,
            url,
            likes: 0
        }
        await blogService.create(newBlog)
        addBlog(newBlog)
        const message = {
            message: `a new blog ${title} by ${author} added`,
            type: 'success'
        }
        setNotification(message)
        console.log('Creating blog:', { title, author, url })
        // Reset form fields
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Togglable buttonLabel="create new blog">
            <h2>Create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    <label>
                        title
                        <input type="text" value={title} name="title"
                               onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input type="text" value={author} name="author"
                                onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        url
                        <input type="text" value={url} name="url"
                               onChange={({ target }) => setUrl(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
        </Togglable>

    )
}

export default CreateBlogForm