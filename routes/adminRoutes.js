const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  createAdmin,
  getAdmins
} = require("../controllers/adminController");

const { verifyToken, isSuperAdmin } = require("../middleware/authMiddleware");

router.post("/admin/login", loginAdmin);

// Only superadmin can create admin
router.post("/admin/create", verifyToken, isSuperAdmin, createAdmin);

router.get("/admin/list", verifyToken, isSuperAdmin, getAdmins);

module.exports = router;