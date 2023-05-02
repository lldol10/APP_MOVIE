class AppError{
    message
    statuscode
    
        constructor(message, statuscode = 200){
            this.message = message
            this.statuscode = statuscode
        }
}

module.exports = AppError