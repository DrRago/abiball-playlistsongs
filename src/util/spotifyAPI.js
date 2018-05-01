const SpotifyWebApi = require('spotify-web-api-node');
const constants = require("../constants");
const log = require("./../util/log")

const get_spotify_api = (callback) => {
    // Set necessary parts of the credentials on the constructor
    let spotifyApi = new SpotifyWebApi({
        clientId: constants.SPOTIFYCREDENTIALS.CLIENTID,
        clientSecret: constants.SPOTIFYCREDENTIALS.CLIENTSECRET
    });

    // Get an access token and 'save' it using a setter
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            spotifyApi = new SpotifyWebApi({
                    accessToken: data.body['access_token']
                }
            );
            callback(spotifyApi)
        },
        function (err) {
            log.crit(err);
            constants.ERROR = true;
        }
    );
};

const get_tracks_info = (tracks, callback) => {
    if (tracks.length > 50) {
        tracks = tracks.slice(0, 50)
    }
    get_spotify_api(function (spotify_api) {
        spotify_api.getTracks(tracks).then(
            function (data) {
                callback(data.body)
            },
            function (err) {
                console.log(err);
                constants.ERROR = true;
            }
        )
    })
}

const get_artist_top = (artist, callback) => {
    get_spotify_api(function (spotify_api) {
        spotify_api.getArtistTopTracks(artist, "DE").then(
            function (data) {
                callback(data.body)
            },
            function (err) {
                console.log(err);
                constants.ERROR = true;
            }
        )
    })
}

const search_tracks = (query, callback) => {
    let result = {};
    get_spotify_api((spotify_api) => {
        spotify_api.searchTracks(query, {limit: 15}).then(
            function (data) {
                result = data.body.tracks.items
                callback(result)
            },
            function (err) {
                log.crit(err);
                constants.ERROR = true;
            }
        )
    })
};

const get_album_tracks = (album, callback) => {
    get_spotify_api(function (spotify_api) {
        spotify_api.getAlbumTracks(album).then(
            function (data) {
                callback(data.body)
            },
            function (err) {
                console.log(err);
                constants.ERROR = true;
            }
        )
    })
}

const search_album = (query, callback) => {
    query = query.substr(query.indexOf(":") + 1, query.length)
    get_spotify_api((spotify_api) => {
        spotify_api.searchAlbums(query, {limit: 1}).then(
            function (data) {
                if (data.body.albums.total === 0) {
                    return callback("")
                }

                get_album_tracks(data.body.albums.items[0].id, (tracks) => {
                    let track_ids = [];
                    tracks.items.forEach((track) => {
                        track_ids.push(track.id)
                    });
                    get_tracks_info(track_ids, (full_tracks) => {
                        return callback(full_tracks.tracks)
                    })
                });
            },
            function (err) {
                console.log(err);
                constants.ERROR = true;
            }
        )
    })
};

const search_artists = (query, callback) => {
    query = query.substr(query.indexOf(":") + 1, query.length)
    get_spotify_api((spotify_api) => {
            spotify_api.searchArtists(query, {limit: 10}).then(
                function (data) {
                    if (data.body.artists.total === 0) {
                        return callback("")
                    }
                    let top = data.body.artists.items[0]
                    data.body.artists.items.forEach((artist) => {
                        if (artist.popularity > top.popularity) {
                            top = artist
                        }
                    });
                    get_artist_top(top.id, (data) => {
                        let track_ids = [];
                        data.tracks.forEach((track) => {
                            track_ids.push(track.id)
                        });
                        get_tracks_info(track_ids, (full_tracks) => {
                            return callback(full_tracks.tracks)
                        })
                    })
                })
        },
        function (err) {
            log.crit(err);
            constants.ERROR = true;
        }
    )
};

const get_playlist = (user, playlist, callback) => {
    get_spotify_api(function (spotify_api) {
        spotify_api.getPlaylistTracks(user, playlist).then(
            function (data) {
                callback(data.body)
            },
            function (err) {
                console.log(err);
                constants.ERROR = true;
            }
        )
    })
}

const search_playlist = (query, callback) => {
    query = query.substr(query.indexOf(":") + 1, query.length)
    get_spotify_api((spotify_api) => {
        spotify_api.searchPlaylists(query, {limit: 1}).then(
            function (data) {
                if (data.body.playlists.total === 0) {
                    return callback("")
                }
                get_playlist(data.body.playlists.items[0].owner.id, data.body.playlists.items[0].id, (data) => {
                    let track_ids = [];
                    data.items.forEach((item) => {
                        track_ids.push(item.track.id)
                    });
                    get_tracks_info(track_ids, (full_tracks) => {
                        return callback(full_tracks.tracks)
                    })
                });
            },
            function (err) {
                console.log(err);
                constants.ERROR = true;
            }
        )
    })
};

module.exports = {
    get_spotify_api,
    get_tracks_info,
    search_tracks,
    search_album,
    search_artists,
    search_playlist,
    get_artist_top,
    get_album_tracks,
    get_playlist
}
