const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const jwt = require("jsonwebtoken")
const User = require("../models/User")

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
})

blogRouter.post('/', async (request, response,next) => {
    const user = request.user
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    try{
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }catch (error){
        if(error.name === 'ValidationError'){
            return response.status(400).json({error: error.message})
        }
        next(error)
    }
})

blogRouter.delete('/:id',async(request,response,next) => {
    try{
        const user = request.user
        const blog =  await Blog.findById(request.params.id)
        if(blog.user.toString() !== user.id.toString()){
            return response.status(401).json({error: 'only the creator can delete a blog'})
        }
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }catch (error){
        next(error)
    }
})

blogRouter.put('/:id',async(request,response,next)=>{
    const body = request.body
    const blogId = request.params.id

    const blog = await Blog.findById(blogId)
    if (!blog) return response.status(404).end()
    if (blog.user.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: 'only the creator can update a blog' })
    }


    const updateData = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(blogId,updateData,{ new: true, runValidators: true, context: 'query' })
        if(updatedBlog){
            response.json(updatedBlog)
        }else{
            response.status(404).end()
        }
    }catch (error){
        next(error)
    }
})

module.exports = blogRouter