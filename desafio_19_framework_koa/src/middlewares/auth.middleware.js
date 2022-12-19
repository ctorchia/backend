const checkAuth = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    next()
  } else {
    ctx.redirect('/login')
  }
}

module.exports = checkAuth;