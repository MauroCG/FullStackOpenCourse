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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}