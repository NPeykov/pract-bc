const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const server = require('../index')
const openDatabaseConection = require('../mongo')
const { initialBlogs, saveBlog } = require('./test_helpers')

const api = supertest(app)

const blogToPost = {
    title: 'test post',
    author: 'jest',
    url: 'jest.doc',
    likes: 1042
}

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for(let blog of initialBlogs) {
        await saveBlog(blog)
    }
})

test('blog is added', async () => {
    await api
        .post('/api/blogs')
        .send(blogToPost)
        .expect(201)
        .expect('Content-Type', /json/)
})

test('response content is correct', async () => {
    const response = await api.post('/api/blogs').send(blogToPost)

    expect(response.body.tittle).toEqual(blogToPost.tittle)
})

test('blog appears after being post', async () => {
    await api.post('/api/blogs/').send(blogToPost)

    const dbData = await Blog.find({})
    const tittles = dbData.map(data => data.tittle)

    expect(tittles).toContain(blogToPost.tittle)
})



afterAll(() => {
    mongoose.connection.close()
    server.close()
})