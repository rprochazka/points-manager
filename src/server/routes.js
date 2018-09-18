const express = require("express");
const router = express.Router();

const pointService = require("./point.service");

router.get("/points", (req, res) => {
  pointService.getPoints(req, res);
});

router.get("/points/:id", (req, res) => {
  pointService.getPoint(req, res);
});

router.post("/points", (req, res) => {
  pointService.postPoint(req, res);
});

router.put("/points/:id", (req, res) => {
  pointService.putPoint(req, res);
});

router.delete("/points/:id", (req, res) => {
  pointService.deletePoint(req, res);
});

module.exports = router;
