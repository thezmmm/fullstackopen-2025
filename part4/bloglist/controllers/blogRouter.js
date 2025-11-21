const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const {request} = require("express");

blogRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

blogRouter.post('/', async (request, response,next) => {
    const blog = new Blog(request.body)

    // blog.save().then((result) => {
    //     response.status(201).json(result)
    // })

    try{
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }catch (error){
        if(error.name == 'ValidationError'){
            return response.status(400).json({error: error.message})
        }
        next(error)
    }
})

blogRouter.delete('/:id',async(request,response,next) => {
    try{
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }catch (error){
        next(error)
    }
})

blogRouter.put('/:id',async(request,response,next)=>{
    const body = request.body
    const blogId = request.params.id

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