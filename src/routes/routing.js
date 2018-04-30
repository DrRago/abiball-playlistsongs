const login_gets = require("./overview/get.js");


module.exports = (app) => {
    app.route("/").get(login_gets.show);

    // 404 error page
    app.route("*").get((req, res) => {
        res.status(404).render('error/404');
    })
};