const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are returned property id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    expect(blog.id).toBeDefined();
  })
})

test('a new blog was created', async () => {
  const newBlog = {
    title: 'Atomic Habits',
    author: 'James Clear',
    url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_4/144-4337226-9928343',
    likes: 1000
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body
  const contents = blogs.map(r => r.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    'Atomic Habits'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})
