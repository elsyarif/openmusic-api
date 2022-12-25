/* eslint-disable camelcase */
const SongModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

const AlbumModel = ({
  id, name, year, songs, cover,
}) => ({
  id, name, year, songs, coverUrl: cover,
});

module.exports = { SongModel, AlbumModel };
