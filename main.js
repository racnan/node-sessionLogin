const express = require('express')
const session = require('express-session')

const userRouter = require('./controllers/users.js')

const PORT = 3000
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true,
}))

app.use(userRouter)

app.listen(PORT, () => {
    console.log(`Server is up at port ${PORT}`)
})