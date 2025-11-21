const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

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

module.exports = blogRouter