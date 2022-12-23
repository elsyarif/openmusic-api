const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: (request, h) => handler.getPlaylistSongActivities(request, h),
    options: {
      auth: 'jwt_openmusic',
    },
  },
];

module.exports = routes;
