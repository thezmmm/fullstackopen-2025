const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const errorHandler = require('./utils/errorHandler')
const middleware = require('./utils/middleware')

const app = express()

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor,blogRouter)
app.use('/api/users', userRouter)
app.use('/login', loginRouter)

app.use(errorHandler)

module.exports = app