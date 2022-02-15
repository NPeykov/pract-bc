const resetRouter = require("express").Router();
const controller = require("../controllers/resetDB");

resetRouter.post('/reset', controller.resetDB)

module.exports = resetRouter;
