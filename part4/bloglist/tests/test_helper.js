const Blog = require("../models/blog")
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
    url: 'fake url'
  },
  {
    title: "It ends with us",
    author: "Colleen Hoover",
    likes: 1,
    url: 'fake url'
  },
  {
    title: 'It starts with us',
    author: 'Colleen Hoover',
    likes: 85,
    url: 'fake url'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Title',
    author: 'author',
    likes: 85,
    url: 'fake url'
  })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
