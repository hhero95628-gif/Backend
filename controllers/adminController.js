const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const filePath = path.join(__dirname, "../data/admin.json");


// LOGIN
exports.loginAdmin = async (req, res) => {

  const { username, password } = req.body;

  const data = JSON.parse(fs.readFileSync(filePath));

  const admin = data.admins.find(a => a.username === username);

  if (!admin) {
    return res.status(404).json({
      message: "Admin not found"
    });
  }

  const match = password === admin.password;

  if (!match) {
    return res.status(401).json({
      message: "Invalid password"
    });
  }

  const token = jwt.sign(
    { username: admin.username, role: admin.role },
    "SECRETKEY",
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token
  });

};



// CREATE ADMIN
exports.createAdmin = (req, res) => {

  const { username, password } = req.body;

  const data = JSON.parse(fs.readFileSync(filePath));

  const exists = data.admins.find(a => a.username === username);

  if (exists) {
    return res.json({
      message: "Admin already exists"
    });
  }

  const newAdmin = {
    id: Date.now(),
    username,
    password,
    role: "admin"
  };

  data.admins.push(newAdmin);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({
    message: "Admin created",
    admin: newAdmin
  });

};



// GET ADMINS
exports.getAdmins = (req, res) => {

  const data = JSON.parse(fs.readFileSync(filePath));

  res.json({
    admins: data.admins
  });

};