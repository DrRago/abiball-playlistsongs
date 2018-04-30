const spotify_util = require("./../../util/spotifyAPI");

const show = (req, res) => {
    spotify_util.get_spotify_api(function (spotify_api) {
        spotify_api.getPlaylist("pascal_311", "4SVN8xklqPG1jfNtPJ0lre").then(
            function (data) {
                let playlist_content = data.body;
                return res.render("playlist", {TRACKNUM: playlist_content.tracks.items.length, PLAYLIST: playlist_content});
                /*playlist_content.items.forEach(function (element) {
                    console.log(element);
                })*/
            },
            function (err) {
                return res.status(500).render("error/500")
            });
    })
};

module.exports = {
    show
};
