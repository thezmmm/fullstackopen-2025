const { test, describe, beforeEach, after} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const Blog = require('../models/Blog')
const User = require('../models/User')
const app = require('../app')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const api = supertest(app)

let token
let initialBlogs

beforeEach(async () => {
    // clear
    await User.deleteMany({})
    await Blog.deleteMany({})

    // create a test user
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Superuser', passwordHash })
    const savedUser = await user.save()

    // generate token
    const userForToken = {
        username: savedUser.username,
        id: savedUser._id
    }
    token = jwt.sign(userForToken, process.env.SECRET || 'secret')

    // initialize blogs
    initialBlogs = [
        { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
        { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 }
    ]

    for (let blog of initialBlogs) {
        let blogObject = new Blog({ ...blog, user: savedUser._id })
        await blogObject.save()
    }
})

describe('Blog API tests', () => {
    test('blogs are returned as json', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.status, 200)
        assert.match(response.headers['content-type'], /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body.length, initialBlogs.length)
    })
    test('the unique identifier property of the blog posts should be named id', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
        for(let blog of response.body) {
            assert.ok(blog.id)
        }
    })
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "New blog post",
            author: "Test Author",
            url: "http://example.com/new-blog-post",
            likes: 10
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual((await Blog.countDocuments({})), initialBlogs.length + 1)
    })
    test('if the likes property is missing from the request, it will default to 0', async () => {
        const newBlog = {
            title: "New blog post",
            author: "Test Author",
            url: "http://example.com/new-blog-post",
        }
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
        assert.strictEqual(response.body.likes,0)
    })
    test('missing title results in 400',async() => {
        const newBlog = {
            author: "Test Author",
            likes: 0,
            url: "http://example.com/new-blog-post"
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })
    test('missing url results in 400',async() => {
        const newBlog = {
            title: "New blog post",
            author: "Test Author",
            likes: 0
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })
    test('DELETE /api/blogs/:id deletes a blog', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
    test('PUT /api/blogs/:id updates a blog', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToUpdate = blogsAtStart[0]

        const updatedData = {
            title: "Updated Title",
            author: "Updated Author",
            url: "http://example.com/updated-url",
            likes: 42
        }
        const response = await api
            .put(`/api/blogs/${blogToUpdate._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.title, updatedData.title)
        assert.strictEqual(response.body.author, updatedData.author)
        assert.strictEqual(response.body.url, updatedData.url)
        assert.strictEqual(response.body.likes, updatedData.likes)

        const blogAtEnd = await Blog.findById(blogToUpdate._id)
        assert.strictEqual(blogAtEnd.title, updatedData.title)
        assert.strictEqual(blogAtEnd.likes, updatedData.likes)
    })
})




after(async () => {
    await mongoose.connection.close()
})