function adminAuth(req, res, next) {
  if (req.session.user != undefined) {
    next();
  }
  return res.redirect('/login');
}

module.exports = adminAuth; 