
module.exports = {
  requireAdmin: function(req, res, next) {
    if (!req.user.admin) {
      res.send(401, { error: 'admin privileges required' });
      next('admin privileges required');
    }
    else {
      next();
    }
  },
  requireMatchingXid: function(req, res, next) {
    if (req.user.admin) {
      next();
    }
    else if (!req.user.xid) {
      res.send(401, { error: 'token has no valid user' });
      next('token has no valid user');
    }
    else if (req.user.xid != req.params.xid) {
      res.send(401, { error: 'token user does not match requested user' });
      next('token user does not match requested user');
    }
    else {
      next();
    }
  }
};
