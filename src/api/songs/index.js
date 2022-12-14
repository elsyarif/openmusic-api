const SongHandler = require('./handler');
const routes = require('./routes');

const plugin = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songHandler = new SongHandler(service, validator);
    server.route(routes(songHandler));
  },
};

module.exports = plugin;
