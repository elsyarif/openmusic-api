const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ fullname, username, password }) {
    const id = `user-${nanoid(16)}`;
    const hashPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, fullname, username, hashPassword, createdAt, createdAt],
    };

    const result = await this._pool.query(query);

    return result.rows[0].id;
  }

  async getUserById(userId) {}
  
  async verifyUsername(username) {}

  async verifyUserCriential(username, password) {}
}

module.exports = UsersService;
