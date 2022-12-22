class PlaylistSongsHanlder {
  constructor(playlistService, songService, playlistSongService, validator) {
    this._playlistService = playlistService;
    this._songService = songService;
    this._playlistSongService = playlistSongService;
    this._validator = validator;
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { songId } = request.payload;
    const { id } = request.params;

    await this._songService.getSongById(songId);
    await this._playlistSongService.addPlaylistSong({ id, songId });

    const response = h.respons({
      status: 'success',
      message: 'Playlis song berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request, h) {
    const { id } = request.params;

    const playlist = await this._playlistSongService.getPlaylistSong(id);

    const response = h.respons({
      status: 'success',
      data: {
        playlist,
      },
    });
    response.code(200);
    return response;
  }

  async deletePlaylistSongsHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { id } = request.params;
    const { songId } = request.payload;

    await this._playlistSongService.deletePlaylistSong(id, songId);

    const response = h.response({
      status: 'success',
      message: 'Playlist song berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistSongsHanlder;
