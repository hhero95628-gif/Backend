const express = require("express");
const router = express.Router();

const {
  addService,
  getServices,
  getQueries,
  getAllData
} = require("../controllers/serviceController");

router.post("/add", addService);

// GET APIs
router.get("/services", getServices);
router.get("/queries", getQueries);
router.get("/all", getAllData);

module.exports = router;