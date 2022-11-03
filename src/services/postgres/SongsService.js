const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, performer, genre, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      values: [id, title, year, performer, genre, duration, albumId, createAt, updateAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Song gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs() {}

  async getSongById(id) {}

  async editSongById(id, {}) {}

  async deleteSongById(id) {}
}

module.exports = SongsService;
