const AppError = require("../utils/AppError");
const JWT = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    next(error);
  }
}

// Must run after userAuth, e.g. router.post("/", userAuth, authorizeRoles("admin"), handler)
const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    throw new AppError("You do not have permission to perform this action", 403);
  }
  next();
};

module.exports = { userAuth, authorizeRoles };
