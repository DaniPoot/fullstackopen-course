const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumOfLikes = (prev, blog) => prev + (blog?.likes || 0)
  return blogs.reduce(sumOfLikes, 0)
}

module.exports = {
  dummy,
  totalLikes
}