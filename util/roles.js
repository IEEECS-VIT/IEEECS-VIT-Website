exports.allowedUsers = function (roles) {
  return function (req, res, next) {
    if (req.user && roles.indexOf(req.user.role) !== -1) {
      next();
    } else {
      var error = new Error ('Unauthorized');
      error.status = 403;
      next(error);
    }
  };
};