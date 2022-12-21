const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ fullname, username, password }) {
    await this.verifyUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashPassword = await bcrypt.hash(password, 11);
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, fullname, username, hashPassword, createdAt, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async verifyUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Gagal menambah user. Username suadah digunakan');
    }

    return result.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, username, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Username/password salah');
    }

    const match = await bcrypt.compare(password, result.rows[0].password);

    if (!match) {
      throw new InvariantError('Username/password salah');
    }
  }
}

module.exports = UsersService;
