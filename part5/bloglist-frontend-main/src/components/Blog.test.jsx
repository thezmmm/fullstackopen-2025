// Blog.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog.jsx'
import blogService from "../services/blogService.js"
import CreateBlogForm from "./CreateBlogForm.jsx";


vi.mock("../services/blogService.js", () => {
    return {
        default: {
            update: vi.fn(),
            remove: vi.fn(),
            create: vi.fn()
        }
    }
})

describe('Blog component tests', () => {
    const blog = {
        id: '1',
        title: 'Test Blog',
        author: 'Tester',
        url: 'http://test.com',
        likes: 5
    }

    test('5.13: shows title and author by default, hides url and likes', () => {
        render(<Blog blog={blog} />)
        expect(screen.getByText('Test Blog')).toBeDefined()

        // author
        const authorDiv = screen.getByText('Tester').parentElement
        expect(authorDiv).toHaveStyle('display: none')

        // url
        const urlDiv = screen.getByText('http://test.com').parentElement
        expect(urlDiv).toHaveStyle('display: none')

        // likes
        const likesDiv = screen.getByText('5 likes').parentElement
        expect(likesDiv).toHaveStyle('display: none')
    })

    test('5.14: shows url and likes after clicking view', async () => {
        render(<Blog blog={blog} />)
        const user = userEvent.setup()
        await user.click(screen.getByText('view'))
        expect(screen.getByText('http://test.com')).toBeVisible()
        expect(screen.getByText('5 likes')).toBeVisible()
    })

    test('5.15: like button calls handler twice', async () => {
        render(<Blog blog={blog} />)
        const user = userEvent.setup()
        const viewButton = screen.getByText("view")
        await user.click(viewButton)
        const likeButton = screen.getByText("like")
        await user.click(likeButton)
        await user.click(likeButton)
        expect(blogService.update).toHaveBeenCalledTimes(2)
    })
})

describe('CreateBlogForm component test', () => {
    test('5.16: form calls event handler with correct details', async () => {
        const addBlog = vi.fn()
        const setNotification = vi.fn()

        render(<CreateBlogForm addBlog={addBlog} setNotification={setNotification} />)

        const user = userEvent.setup()

        await user.click(screen.getByRole("button", { name: /create new blog/i }))


        await user.type(screen.getByLabelText(/title/i), "Test Blog")
        await user.type(screen.getByLabelText(/author/i), "John Doe")
        await user.type(screen.getByLabelText(/url/i), "http://example.com")


        await user.click(screen.getByRole("button", { name: /create/i }))


        expect(addBlog).toHaveBeenCalledTimes(1);
        expect(addBlog).toHaveBeenCalledWith({
            title: "Test Blog",
            author: "John Doe",
            url: "http://example.com",
        })


        expect(setNotification).toHaveBeenCalledTimes(1);
        expect(setNotification).toHaveBeenCalledWith({
            message: "a new blog Test Blog by John Doe added",
            type: "success",
        })
    })
})