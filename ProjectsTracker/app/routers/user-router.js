/* globals module require */
"use strict";
const user = require("../config/roles");

module.exports = function (server, userController) {
    let passport = require("passport");

    server.get("/users", userController.viewAllUsers);
    server.get("/user/:name", userController.viewUserByName);
    server.get("/register", userController.registerPage);
    server.post("/register", userController.createUser);
    server.get("/profile", userController.getProfile);

    server.post("/login", userController.loginLocal);

    server.get("/login", userController.login);

    server.get('/auth/facebook', passport.authenticate('facebook',{scope: ['email']}));

    server.get("/auth/facebook/return", passport.authenticate("facebook", {
            failureRedirect: '/login'
        }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect("/profile");
        });

    server.get("/auth/github", passport.authenticate("github"));

    server.get("/auth/github/callback", passport.authenticate("github", {
            failureRedirect: "/login"
        }),
        function (req, res) {
            // Successful authentication, redirect home.
            console.log(req.user.username);
            res.redirect("/profile");
        });
    server.get("/admin", user.can("access admin page"), userController.admin);
    server.get("/forgot", userController.forgot);
    server.post("/forgot", userController.handleForgottenPassword);

    server.get("/reset/:token", userController.showResetPassword);
    server.post("/reset", userController.resetPassword);

    //server.get('/auth/github/callback', userController.loginFromGitHub);

    //server.get("/profile/:username")
};
