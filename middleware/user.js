import { User } from "./db";

// ADMIN middleware
function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  User.findOne({ username, password })
    .then((res) => {
      if (res) next();
    })
    .catch(() => {
      res.status(403).json({
        message: "User doesn't exists",
      });
    });
}

module.exports({
  userMiddleware,
});
