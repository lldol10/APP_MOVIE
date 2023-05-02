require("express-async-errors")
const express = require("express")
const migrationsRun = require("./database/sqlite/migrations")
const routes = require("./routes")
const AppError = require("./utils/apperror")


const app = express()
app.use(express.json())
app.use(routes)

migrationsRun()

//TRATANDO O ERRO QUE A APLICAÇÃO GERARr
app.use((error, request, response, next) => {
    
    if(error instanceof AppError){
        return response.status(error.statuscode).json({
            status: "error",
            message: error.message
            
        })
        
    }
    
    return response.status(500).json({
        status: "error",
        message: "internal server error"
    })
})

const PORT = 3333
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`)
})