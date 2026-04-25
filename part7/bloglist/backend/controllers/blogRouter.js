const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
    const user = request.user
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        const populated = await savedBlog.populate('user', { username: 1, name: 1, id: 1 })
        response.status(201).json(populated)
    } catch (error) {
        next(error)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const user = request.user
        const blog = await Blog.findById(request.params.id)
        if (!blog) return response.status(404).end()
        if (blog.user.toString() !== user.id.toString()) {
            return response.status(401).json({ error: 'only the creator can delete a blog' })
        }
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blogId = request.params.id

    try {
        const blog = await Blog.findById(blogId)
        if (!blog) return response.status(404).end()

        const updateData = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true, runValidators: true })
            .populate('user', { username: 1, name: 1, id: 1 })
        response.json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

blogRouter.get('/:id/comments', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (!blog) return response.status(404).end()
        response.json(blog.comments)
    } catch (error) {
        next(error)
    }
})

blogRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (!blog) return response.status(404).end()
        blog.comments = blog.comments.concat(request.body.comment)
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog.comments)
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouter
