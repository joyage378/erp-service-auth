var auth = require('../libs/authMiddleware');
var userAuthCtrl =  require('./userAuthCtrl')
module.exports = function(router) {
    router.get("/user/signup", userAuthCtrl.signup)
    router.post("/user/signin", userAuthCtrl.signinByEmailPassword)
    router.post("/user/forgotPassword", userAuthCtrl.forgotPassword)
   // router.post("/user/set-password", auth.isAuthenticated, userAuthCtrl.setPassword)
}