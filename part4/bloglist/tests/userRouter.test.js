const { test, describe, beforeEach, after} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('POST /api/users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('should create a new user with valid data', async () => {
        const newUser = {
            username: 'test',
            name: 'test',
            password: '12345'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.username, newUser.username)
        assert.strictEqual(response.body.name, newUser.name)
        assert.ok(response.body.id || response.body._id) // 看你的 schema 转换情况

        const usersInDb = await User.find({})
        assert.strictEqual(usersInDb.length, 1)
        assert.strictEqual(usersInDb[0].username, 'test')
    })

    test('should return 400 if password is too short', async () => {
        const invalidUser = {
            username: 'test',
            name: 'test',
            password: 'ab' // length < 3
        }

        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)

        assert.strictEqual(
            response.body.error,
            'password must be at least 3 characters long'
        )

        const usersInDb = await User.find({})
        assert.strictEqual(usersInDb.length, 0)
    })
})

after(async () => {
    await mongoose.connection.close()
})
