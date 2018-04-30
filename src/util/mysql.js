const constants = require("./../constants")
const log = require('./../util/log.js');
const spotify_util = require("./../util/spotifyAPI")

const check_connection = () => {
    if (constants.CONNECTIONS.MYSQL.state === "disconnected") {
        constants.CONNECTIONS.MYSQL.connect((error) => {
            if (error) {
                log.crit(error)
            }
            else {
                log.info("Reconnected to MYSQL");
            }
        });
    }
}

const get_songs = (callback) => {
    check_connection()
    constants.CONNECTIONS.MYSQL.query("SELECT * FROM `songs` WHERE 1", (error, result) => {
        if (error){
            log.crit(error)
            constants.ERROR = true;
            return
        }

        const dict = []

        for (let i = 0; i < result.length; i++){
            dict.push(
                {
                    id: result[i].id,
                    spotify_track: result[i].spotify_track,
                    votes: result[i].votes
                }
            )
        }
        callback(dict)
    });
}

const vote_up = (track, callback) => {
    check_connection()
    constants.CONNECTIONS.MYSQL.query("UPDATE `songs` SET `votes`= `votes` + 1 WHERE `spotify_track` = ?", track, (error, result) => {
        if (error){
            log.crit(error)
            constants.ERROR = true;
            return
        }
        callback()
    });
}

const vote_down = (track, callback) => {
    check_connection()
    constants.CONNECTIONS.MYSQL.query("UPDATE `songs` SET `votes`= `votes` - 1 WHERE `spotify_track` = ?", track, (error, result) => {
        if (error){
            log.crit(error)
            constants.ERROR = true;
            return
        }
        callback()
    });
}

module.exports = {
    check_connection,
    get_songs,
    vote_up,
    vote_down
}