const authMiddleware = async (req, res, next) => {
    const { username } = req.session;
    if(username == 'Cristian'){
      return next()
    }
    
    res.render('pages/login')
    // return res.status(400).send(`<h1>Usuario no autenticado</h1>`)
  };
  
  module.exports = authMiddleware;