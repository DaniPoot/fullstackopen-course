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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}