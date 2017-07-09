/**
 * Created by yjzhme on 2017/7/7.
 */

const chalk = require('chalk');
const config = require('../config');
const server = require('pushstate-server');


// let { port, host } = config.server;
// port += 1;

server.start({
  port: config.dev.port + 1,
  directory: config.build.assetsRoot,
});

const url = `http://localhost:${config.dev.port + 1}`;
// openBrowser(url);

console.log(chalk.green(`Dist server listening on ${url} ...`));
