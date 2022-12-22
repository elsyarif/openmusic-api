const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong(playlistId, { songId }) {
    const id = `playlist-song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Playlist song gagal ditambahkan');
    }
  }

  async getPlaylistSong(playlistId) {
    const query = {
      text: `SELECT A.id, A.name, B.username 
        FROM playlists A 
        LEFT JOIN users B ON B.id = a.owner
        WHERE A.id = $1`,
      values: [playlistId],
    };

    let result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = result.rows[0];

    const querySong = {
      text: `SELECT C.id, C.title, C.performer FROM playlists A 
        JOIN playlist_songs B ON  B.playlist_id = A.id
        JOIN songs C ON C.id = B.song_id
        WHERE A.id = $1`,
      values: [playlistId],
    };

    result = await this._pool.query(querySong);

    playlist.songs = result.rows;

    return playlist;
  }

  async deletePlaylistSong(palylistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [palylistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Playlist song gagal dihapus, playlist id dan song id tidak ditemukan');
    }
  }
}

module.exports = PlaylistSongsService;
