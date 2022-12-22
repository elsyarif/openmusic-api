const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, {
    playlistService, songsService, playlistSongService, validator,
  }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistService,
      songsService,
      playlistSongService,
      validator,
    );
    server.route(routes(playlistSongsHandler));
  },
};
