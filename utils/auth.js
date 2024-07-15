const withAuth = (req, res, next) => {
  // if the user is not logged in, redirect the request to the login route
  //next pass control to the next middleware function
  if (!req.session.logged_in) {
    res.redirect('/login');  //redirects the request to login route
  } else {
    //proceed if logged in
    next();
  }
};

module.exports = withAuth;