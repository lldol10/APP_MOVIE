const {Router} = require("express")

const usersRouter = Router()
const Userscontroller = require("../controllers/userscontroller")

const userscontroller = new Userscontroller()





usersRouter.post("/", userscontroller.create )
usersRouter.put("/:id", userscontroller.update )

module.exports = usersRouter