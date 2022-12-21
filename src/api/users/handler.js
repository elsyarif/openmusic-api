class UserHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);

    const { fullname, username, password } = request.payload;

    const userId = await this._service.addUser({ fullname, username, password });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });

    response.code(201);
    return response;
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.params;

    const user = await this._service.getUserById(id);

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        user,
      },
    });

    response.code(200);
    return response;
  }
}

module.exports = UserHandler;
