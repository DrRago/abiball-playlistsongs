const mysql_util = require("./../../util/mysql");
const spotify_util = require("./../../util/spotifyAPI")


const show = (req, res) => {
    mysql_util.get_songs(function (dict) {
        let track_ids = [];
        for (let i = 0; i < dict.length; i ++) {
            track_ids.push(dict[i].spotify_track)
        }
        spotify_util.get_tracks_info(track_ids, (data) => {
            for (let i = 0; i < dict.length; i ++) {
                dict[i].full_track = data.tracks[i];
            }
            return res.render("overview", {TRACKS: dict})
        })
    });
}

module.exports = {
    show
}