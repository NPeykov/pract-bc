const Blog = require("../models/blog");
const mongoose = require("mongoose")

const initialBlogs = [
    {
        title: 'first blog',
        author: 'lawrence',
        url: 'taringa.ls',
        likes: 105
    },
    {
        title: 'second blog',
        author: 'dekker',
        url: 'eet.5',
        likes: 36
    },
    {
        title: 'third blog',
        author: 'bluesband',
        url: 'harmon.s',
        likes: 48
    }
]

async function saveBlog(blog) {
    const newBlog = new Blog(blog)

    try{
        await newBlog.save()
        console.log('note saved')
    }
    catch(e) {
        console.log('couldnt save note: ', e.message)
    }
   
}

module.exports = { initialBlogs, saveBlog }