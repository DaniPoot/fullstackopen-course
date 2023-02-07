const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes([...listWithOneBlog, ...listWithOneBlog])
    expect(result).toBe(10)
  })

})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
  ]
  const listWithThreeBlogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: "It ends with us",
      author: "Colleen Hoover",
      likes: 1
    },
    {
      title: 'It starts with us',
      author: 'Colleen Hoover',
      likes: 85
    }
  ]


  test('when list has only one blog, return the same blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

  test('of a bigger list return the blog with more likes', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result).toEqual({
      title: 'It starts with us',
      author: 'Colleen Hoover',
      likes: 85
    })
  })

})