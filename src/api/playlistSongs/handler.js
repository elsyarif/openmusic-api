class PlaylistSongsHandler {
  constructor(
    playlistService,
    songService,
    playlistSongService,
    playlistSongsActivitiesService,
    validator,
  ) {
    this._playlistService = playlistService;
    this._songService = songService;
    this._playlistSongService = playlistSongService;
    this._playlistSongsActivitiesService = playlistSongsActivitiesService;
    this._validator = validator;
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const { id } = request.params;

    await this._songService.getSongById(songId);
    await this._playlistService.verifyPlaylistAccess(id, credentialId);

    await this._playlistSongService.addPlaylistSong(id, { songId });

    const action = 'add';
    const time = new Date().toISOString();
    await this._playlistSongsActivitiesService.addPlaylistSongActivities(id, {
      songId, userId: credentialId, action, time,
    });

    const response = h.response({
      status: 'success',
      message: 'Playlist song berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistAccess(id, credentialId);
    const playlist = await this._playlistSongService.getPlaylistSong(id);

    const response = h.response({
      status: 'success',
      data: {
        playlist,
      },
    });
    response.code(200);
    return response;
  }

  async deletePlaylistSongsHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistAccess(id, credentialId);
    await this._playlistSongService.deletePlaylistSong(id, songId);

    const action = 'delete';
    const time = new Date().toISOString();
    await this._playlistSongsActivitiesService.addPlaylistSongActivities(id, {
      songId, userId: credentialId, action, time,
    });

    const response = h.response({
      status: 'success',
      message: 'Playlist song berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistSongsHandler;
