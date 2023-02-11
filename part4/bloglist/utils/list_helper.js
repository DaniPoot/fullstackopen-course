const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumOfLikes = (prev, blog) => prev + (blog?.likes || 0)
  return blogs.reduce(sumOfLikes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite

  blogs.forEach(blog => {
    if (favorite) {
      favorite = blog.likes > favorite.likes ? blog : favorite 
    } else {
      favorite = blog
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  const orderList = _.sortBy(blogs, ['blogs'])
  return _.last(orderList)
}

const mostLikes = (blogs) => {
  const orderList = _.sortBy(blogs, ['blogs'])
  const blog = _.last(orderList)
  return blog.author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
