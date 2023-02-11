const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url } = request.body
  if (!title || !url) {
    response.status(400).end()
    return
  }
  const blog = new Blog(request.body)
  await blog.save()

  response.status(201).json(blog)
})

module.exports = blogsRouter
