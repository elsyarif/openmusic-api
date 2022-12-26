const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { use } = require('bcrypt/promises');

class UserAlbumLikesService {
  constructor() {
    this._pool = new Pool();
  }

  async likeAlbum(userId, albumId) {
    const id = `user-album-like${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes values ($1, $2, $3)',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('User gagal like album');
    }
  }

  async unlikeAlbum(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('User gagal unlike album');
    }
  }

  async getAlbumLike(albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);
    return result.rowCount;
  }

  async verifyAlbumLike(userId, albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    return result.rowCount;
  }
}

module.exports = UserAlbumLikesService;
