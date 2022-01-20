const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const server = require('../index')
const { initialBlogs, saveBlog } = require('./blog_helper')

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

describe("get method tests", () => {
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
})

describe("post method tests", () => {
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
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
