import { Admin } from "./db";

// ADMIN middleware
function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.findOne({ username, password })
    .then((res) => {
      if (res) next();
    })
    .catch(() => {
      res.status(403).json({
        message: "Admin doesn't exists",
      });
    });
}

module.exports = adminMiddleware;
