const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length === 0 ? 1 : 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  let favorite = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const blogs_counts = _.countBy(blogs, 'author')
  const author = Object.keys(blogs_counts).pop()
  const total_blogs = blogs_counts[author]

  return { author: author, blogs: total_blogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const result = _(blogs).groupBy('author').map((objs, key) => ({
    'author': key,
    'likes': _.sumBy(objs, 'likes')
  })).value()

  let mostLiked = result[0]

  result.forEach(obj => {
    if (obj.likes > mostLiked.likes) {
      mostLiked = obj
    }
  })

  return mostLiked
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}