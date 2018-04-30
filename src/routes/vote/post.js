const mysql_util = require("./../../util/mysql");

const up = (req, res) => {
    mysql_util.vote_up(req.body.id, function () {
        return res.sendStatus(200)
    })
}

const down = (req, res) => {
    mysql_util.vote_down(req.body.id, function () {
        return res.sendStatus(200)
    })
}

module.exports = {
    up,
    down
}