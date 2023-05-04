const { Router } = require('express');

const authenticator = require("../middleware/authenticator");
const diaryController = require('../controllers/diary.js');

const diaryRouter = Router();

diaryRouter.get("/", authenticator, diaryController.index);
diaryRouter.post("/", diaryController.create);
diaryRouter.get("/:id", diaryController.show);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;
