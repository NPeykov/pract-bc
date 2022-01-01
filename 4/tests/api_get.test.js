const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const server = require('../index')
const openDatabaseConection = require('../mongo')
const { initialBlogs, saveBlog } = require('./test_helpers')


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for(let blog of initialBlogs) {
        await saveBlog(blog)
    }
})

test('blogs returns 200 code', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
})

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect('Content-Type', /json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs/')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a blog is contained in response content', async () => {
    const response = await api.get('/api/blogs/')
    const tittles = response.body.map(res => res.tittle)

    expect(tittles).toContain(initialBlogs[0].tittle)
})


afterAll(() => {
    mongoose.connection.close()
    server.close()
})