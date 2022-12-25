const ExportsHandler = require('./handler');
const routers = require('./routes');

module.exports = {
  name: 'export',
  version: '1.0.0',
  register: async (server, { producerService, playlistService, validator }) => {
    const exportHandler = new ExportsHandler(producerService, playlistService, validator);
    server.route(routers(exportHandler));
  },
};
