const eventController = require("../controllers/eventController");
const router = require("express").Router();

router.post("/", eventController.addEvent);
router.get("/", eventController.getEvents);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.updateEvent);

module.exports = router;