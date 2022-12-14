class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSongHander(request, h) {
    this._validator.validateSongPayload(request.payload);

    const {
      title, year, genre, performer, duration, albumId,
    } = request.payload;

    const songId = await this._service.addSong({
      title, year, genre, performer, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan',
      data: {
        songId,
      },
    });

    response.code(201);
    return response;
  }

  async getSongsHander(request, h) {
    const { title, performer } = request.query;
    const songs = await this._service.getSongs({ title, performer });

    const response = h.response({
      status: 'success',
      message: 'Get songs berhasil',
      data: {
        songs,
      },
    });

    response.code(200);
    return response;
  }

  async getSongByIdHander(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    const response = h.response({
      status: 'success',
      message: 'Get song id berhasil',
      data: {
        song,
      },
    });

    response.code(200);
    return response;
  }

  async putSongByIdHander(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    const {
      title, year, genre, performer, duration, albumId,
    } = request.payload;

    await this._service.editSongById(id, {
      title, year, genre, performer, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      message: 'song berhasil diperbaharui',
    });

    response.code(200);
    return response;
  }

  async deleteSongByIdHander(request, h) {
    const { id } = request.params;

    await this._service.deleteSongById(id);

    const response = h.response({
      status: 'success',
      message: 'song berhasil dihapus',
    });

    response.code(200);
    return response;
  }
}

module.exports = SongHandler;
