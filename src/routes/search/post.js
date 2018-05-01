const spotify_util = require("./../../util/spotifyAPI")


const search = (req, res) => {
    let query = req.params.query;
    if (query.charAt(query.indexOf(":") + 1) !== "") {
        switch (query.substr(0, query.indexOf(":"))) {
            case "artist":
                spotify_util.search_artists(query, (data) => {
                    return res.status(200).send(JSON.stringify(data))
                });
                break;
            case "album":
                spotify_util.search_album(query, (data) => {
                    return res.status(200).send(JSON.stringify(data))
                });
                break;
            case "playlist":
                spotify_util.search_playlist(query, (data) => {
                    return res.status(200).send(JSON.stringify(data))
                });
                break;
            case "spotify":
                query = query.replace("spotify:", "");
                if (query.charAt(query.indexOf(":") + 1) !== "") {
                    switch (query.substr(0, query.indexOf(":"))) {
                        case "artist":
                            spotify_util.get_artist_top(query.substr(query.indexOf(":") + 1, query.length), (data) => {
                                return res.status(200).send(JSON.stringify(data.tracks))
                            });
                            break;
                        case "track":
                            spotify_util.get_tracks_info([query.substr(query.indexOf(":") + 1, query.length),], (data) => {
                                return res.status(200).send(JSON.stringify(data.tracks))
                            });
                            break;
                        case "album":
                            spotify_util.get_album_tracks(query.substr(query.indexOf(":") + 1, query.length), (data) => {
                                let track_ids = [];
                                data.items.forEach((item) => {
                                    track_ids.push(item.id)
                                });
                                spotify_util.get_tracks_info(track_ids, (data) => {
                                    return res.status(200).send(JSON.stringify(data.tracks))
                                })
                            });
                            break;
                        case "user":
                            let user = query.substr(query.indexOf(":") + 1, query.length);
                            user = user.substr(0, user.indexOf(":"));
                            let playlist = query.substr(query.lastIndexOf(":") + 1, query.length)
                            spotify_util.get_playlist(user, playlist, (data) => {
                                let track_ids = [];
                                data.items.forEach((item) => {
                                    track_ids.push(item.track.id)
                                });
                                spotify_util.get_tracks_info(track_ids, (data) => {
                                    return res.status(200).send(JSON.stringify(data.tracks))
                                })
                            });
                            break;
                    }
                } else {
                    res.send("[]")
                }
                break;
            default:
                spotify_util.search_tracks(query, (data) => {
                    res.status(200).send(JSON.stringify(data))
                })
        }
    }
    else {
        res.send("[]")
    }
};

module.exports = {
    search
}