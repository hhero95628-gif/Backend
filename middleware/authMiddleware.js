const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {

    const decoded = jwt.verify(token, "SECRETKEY");
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.isSuperAdmin = (req, res, next) => {

  if (req.user.role !== "superadmin") {
    return res.status(403).json({
      message: "Only SuperAdmin allowed"
    });
  }

  next();
};