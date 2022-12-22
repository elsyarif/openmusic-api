const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlist/{id}/songs',
    handler: (request, h) => handler.postPlaylistSongsHandler(request, h),
    options: {
      auth: 'jwt_openmusic',
    },
  },
  {
    method: 'GET',
    path: '/playlist/{id}/songs',
    handler: (request, h) => handler.getPlaylistSongsHandler(request, h),
    options: {
      auth: 'jwt_openmusic',
    },
  },
  {
    method: 'DELETE',
    path: '/playlist/{id}/songs',
    handler: (request, h) => handler.deletePlaylistSongsHandler(request, h),
    options: {
      auth: 'jwt_openmusic',
    },
  },
];

module.exports = routes;
