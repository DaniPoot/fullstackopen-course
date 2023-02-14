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

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  if (!id) {
    return response.status(400).end()
  }
  await Blog.findByIdAndDelete(id)
  response.status(201).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { body, params: { id } } = request
  if (!id) {
    return response.status(400).end()
  }
  const blog = await Blog.findOneAndUpdate({ _id: id }, body,  { new: true, runValidators: true, context: 'query'})
  if (!blog) {
    return response.status(404).end()
  }
  response.json(blog)
})

module.exports = blogsRouter
