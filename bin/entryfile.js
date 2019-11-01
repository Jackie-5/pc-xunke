const fs = require('fs');
const path = require('path');
const config = require('../server/config/index');

module.exports = (() => {
  const entryFile = {};

  const configDir = path.join(process.cwd(), config.CLIENT_ROUTER.configDir);

  fs.readdirSync(configDir).forEach((item) => {

    const routerPathDir = require(path.join(configDir, item));

    if (routerPathDir.routers && routerPathDir.routers.length > 0) {

      routerPathDir.routers.forEach((routerItem) => {
        if (Array.isArray(routerItem.clientPath)) {
          routerItem.clientPath.forEach((clientItem) => {
            if (clientItem.clientPage) {
              entryFile[clientItem.clientPage] = `${path.join(config.STATIC_DIR, clientItem.clientPage)}.js`;
            }
          });
        } else if (typeof routerItem.clientPath === 'object' && routerItem.clientPath.clientPage) {
          entryFile[routerItem.clientPath.clientPage] = `${path.join(config.STATIC_DIR, routerItem.clientPath.clientPage)}.js`;
        } else {
          console.error('找不到 router clientPath');
        }
      });
    }

  });

  return entryFile;
})();
