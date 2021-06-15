const auth = require("../../middleware/auth");
const TaskModel = require("../models/Task");
const router = new express.Router();

router.post("/createTask", auth, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    res.status(200).json(await TaskModel.createTask(req.body));
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/editTask", auth, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    res.status(200).json(await TaskModel.editTask(req.body));
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/getTask", auth, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    res.status(200).json(await TaskModel.getTask(req.body));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
