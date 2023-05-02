

const { hash, compare } = require("bcryptjs")
const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/apperror")
const { application } = require("express")


class Userscontroller{
async create(request, response){
    const {name, email, password} = request.body
    console.log(name, email, password)
    const database = await sqliteConnection()

    const userCheckExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    console.log(userCheckExists)
    if(userCheckExists){
        throw new AppError("Email já em uso")
    }

    const hashedPassword = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password) values (?, ?, ?)",[name, email, hashedPassword])
    return response.status(201).json()
    
}

async update(request, response){
    const {name, email, password, old_password} =  request.body
    const {id} = request.params

    const database = await sqliteConnection()
    const user = await database.get("select * from users where id = (?)", [id])
console.log(user)
    if(!user){
        throw new AppError("Usuario não encontrado")
    }

    const userWithUpdatedEmail = await database.get("select * from users where email = (?)", [email])
    //console.log(userWithUpdatedEmail)
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
        throw new AppError("Email em uso")
    } 
    
    user.name = name
    user.email = email

    if(password && !old_password){
        throw new AppError("Informe a senha antiga")
    }

    if(password && old_password){
        console.log("A senha da variavel password: " + password + "agora a da user.password é: " + user.password)
        const checkOldPassword = await compare(old_password, user.password)

        if(!checkOldPassword){
            throw new AppError("a senha antiga não confere")
        }
    }

    user.password = await hash(password, 8)
  

    await database.run(`

        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = ?
        WHERE id = ?`, [user.name, user.email, user.password, new Date(), id ]
        )

        return response.json()
}

}
module.exports = Userscontroller

