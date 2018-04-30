const playlist_get = require("./playlist/get");
const vote_get = require("./vote/get");
const vote_post = require("./vote/post");
const constants = require("./../constants");
const search_post = require("./search/post")

module.exports = (app) => {
    app.route("*").get((req, res, next) => {
        if (constants.ERROR) {
            return res.status(500).render("error/500")
        } else {
            return next();
        }
    })

    app.route('(/|/vote)').get(vote_get.show);
    app.route("/vote/up").post(vote_post.up);
    app.route("/vote/down").post(vote_post.down)

    app.route("/playlist").get(playlist_get.show);

    app.route("/search/:query").get(search_post.search)

    // 404 error page
    app.route("*").get((req, res) => {
        res.status(404).render('error/404');
    })
};