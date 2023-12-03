const checkAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.json('Giriş yetkiniz yok!');
    }
  };
  
  export default checkAuth;