module.exports = {
    ensureAuth : async (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        } else {
            res.redirect('/')
        }
    }
}