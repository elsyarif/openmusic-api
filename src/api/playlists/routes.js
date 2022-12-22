const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlist',
    handler: (request, h) => handler.postPlaylistHandler(request, h),
    options: {
      auth: 'jwt_openmusic',
    },
  },
  {
    method: 'GET',
    path: '/playlist',
    handler: (request, h) => handler.getPlaylistHandler(request, h),
    options: {
      auth: 'jwt_openmusic',
    },
  },
  {
    method: 'DELETE',
    path: '/playlist/{id}',
    handler: (request, h) => handler.deletePlaylistHandler(request, h),
    options: {
      auth: 'jwt_openmusic',
    },
  },
];

module.exports = routes;
