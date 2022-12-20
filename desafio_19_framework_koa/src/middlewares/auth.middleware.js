const checkAuth = (req, next) => {
  console.log(req)
  if (req.isAuthenticated()) {
    next()
  } else {
    req.redirect('/login')
  }
}

module.exports = checkAuth;