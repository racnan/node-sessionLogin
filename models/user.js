const fs = require('fs')
const bcrypt = require('bcrypt')

// const user = {
//     firstname: "abc",
//     lastname:  "xyz",
//     username : "user88",
//     password : "abcabc",
// }

const saveJSON = (user) => {
    const dataJSON = JSON.stringify(user)
    fs.writeFileSync('./models/data/data.json', dataJSON)
}

const loadJSON = () => {
    try {
        const dataBuffer = fs.readFileSync('./models/data/data.json')
        //dataBuffer = <Buffer 7b 22 75 73 ...

        const dataJSON = dataBuffer.toString()
        //dataJSON = {"username":"user2", ...

        return JSON.parse(dataJSON)
        //JSON.parse(dataJSON) = { username: 'user2', ...
    }
    catch(e) {
        //console.log(e)
        return []
    }
}

const hashPasword = (password) => {
    return bcrypt.hashSync(password, 8)
}

const saveUser = (user) => {
    const data = loadJSON()
    data.push({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: hashPasword(user.password),
    })

    saveJSON(data)
}

const checkUsername = (user) => {
    const data = loadJSON()
    const match = data.find((element) => {
        return user.username === element.username
    })
    
    return match
}

const signin = (user) => {
    const data = loadJSON()
    const match = data.findIndex((element) => {
        return element.username === user.username 
    })
    
    if(match === -1) {
        return "No Such User"
    }
    
    if(!bcrypt.compareSync(user.password, data[match].password)){
        return "Invalid Password"
    }

    return "Logged In"
}

module.exports = {
    saveUser,
    checkUsername,
    signin
}