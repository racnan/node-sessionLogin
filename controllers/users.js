const express = require('express')
const path = require('path')

const { checkUsername, saveUser, signin} = require('../models/user.js')

const router = new express.Router()

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/signUp.html'))
})

router.post('/signup', (req, res) => {
    const userExist = checkUsername(req.body)
    if (userExist) {
        return res.send("userExists")
    }
    
    saveUser(req.body)
    res.redirect('/signin')
})

router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/signIn.html'))
})

router.post('/signin', (req, res) => {
    res.send(signin(req.body))
})

module.exports = router