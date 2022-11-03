class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAlbumsHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }
  
  async getAlbumByIdHandler(request, h) {}

  async putAlbumByIdHandler(request, h) {}

  async deleteAlbumByIdHandler(request, h) {}
}

module.exports = AlbumsHandler;
