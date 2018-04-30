const spotify_util = require("./../../util/spotifyAPI")


const search = (req, res) => {
    if (req.params.query.startsWith("artist:") && req.params.query.charAt(8)) {
        spotify_util.search_artists(req.params.query, (data) => {
            return res.status(200).send(JSON.stringify(data))
        })
    } else if (req.params.query.startsWith("album:") && req.params.query.charAt(7)) {
        spotify_util.search_album(req.params.query, (data) => {
            return res.status(200).send(JSON.stringify(data))
        })
    } else if (req.params.query.startsWith("playlist:") && req.params.query.charAt(10)) {
        spotify_util.search_playlist(req.params.query, (data) => {
            return res.status(200).send(JSON.stringify(data))
        })
    } else {
        spotify_util.search_tracks(req.params.query, (data) => {
            res.status(200).send(JSON.stringify(data))
        })
    }
}

module.exports = {
    search
}