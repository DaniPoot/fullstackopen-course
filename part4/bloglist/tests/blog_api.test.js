const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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

test('a new blog was created without likes and return likes with zero', async () => {
  const newBlog = {
    title: 'Atomic Habits',
    author: 'James Clear',
    url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_4/144-4337226-9928343',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body
  const blogsCreated = blogs.find(blog => blog.title === newBlog.title) 

  expect(newBlog.likes).not.toBeDefined()
  expect(blogsCreated.likes).toBeDefined()
  expect(blogsCreated.likes).toBe(0)
})

test('a new blog wasn\'t created if title and url are missing', async () => {
  const newBlog = {
    author: 'James Clear',
    url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_4/144-4337226-9928343',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  newBlog.title = "Atomic Habits"
  newBlog.url = undefined
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deletion of a blog', async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[1]

  await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(201)
})

test('fails with statuscode 404 if note does not exist', async () => {
  const validNonexistingId = await helper.nonExistingId()
  await api
    .get(`/api/blogs/${validNonexistingId}`)
    .expect(404)
})

afterAll(async () => {
  await mongoose.connection.close()
})
