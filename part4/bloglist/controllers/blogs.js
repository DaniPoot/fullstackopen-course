const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, userId, author, likes } = request.body

  const user = await User.findById(userId)

  if (!title || !url) {
    response.status(400).end()
    return
  }
  const blog = new Blog({
    title,
    url,
    author, 
    likes,
    user: user.id
  })
  const saveBlog = await blog.save()
  user.blogs = user.blogs.concat(saveBlog._id)
  await user.save()

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
