const passport = require("./facebook-authentication");
module.exports = function(app) { 


    //  app.use("/", (req, res) => { 
    //     console.log("shiban router");                          
    //     res.render("../views/index", { title: "Our appp" });
    // });

    console.log("router in");   
    app.get("/login/facebook",
        passport.authenticate("facebook"));

    app.get("/auth/facebook",
        passport.authenticate("facebook"));

    app.get("/auth/facebook/return",
        passport.authenticate("facebook", { failureRedirect: "/login" }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect("/");
        });

   

    // app.get("/pesho", (req, res) => {
    //     console.log("ksldfjsdzf");
    //     res.render("found it");
    // });
};