const auth = (req, res, next) => {
    if (req.session.isAuth === true) {
        return next()
    }

    res.redirect('/signin')
}

module.exports = auth