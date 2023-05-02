const {Router} = require("express")
const NotesController = require("../controllers/notesController")

const notesRouter = Router()
const Notescontroller = require("../controllers/notesController")

const notescontroller = new NotesController()





notesRouter.post("/:user_id", notescontroller.create )
notesRouter.get("/:id", notescontroller.show )
notesRouter.delete("/:id", notescontroller.delete )

module.exports = notesRouter