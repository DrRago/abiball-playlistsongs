const SpotifyWebApi = require('spotify-web-api-node');

const show = (req, res) => {
// Set the credentials when making the request
    var spotifyApi = new SpotifyWebApi({
        accessToken: 'BQCG5Ur6PFzDqDC_KIEPFjB__eUBbOj42EcI633PS41nGgIhAKGQ2FOgdt8428Af-1q0d-tf8wS7S9J58iI'
    });

// Do search using the access token
    spotifyApi.addTracksToPlaylist('pascal_311', '4SVN8xklqPG1jfNtPJ0lre', ["spotify:track:0QjewL57d6QobAvn1JoQd9"]).then(
        function(data) {
            console.log(data.body);
        },
        function(err) {
            console.log('Something went wrong!', err);
        }
    );

    return res.render("overview", {DATA: []});
}

module.exports = {
    show
}