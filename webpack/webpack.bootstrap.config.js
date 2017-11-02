const path = require('path');
const fs = require('fs');

// function getBootstraprcCustomLocation() {
//   return process.env.BOOTSTRAPRC_LOCATION;
// }

// const bootstraprcCustomLocation = process.env.BOOTSTRAPRC_LOCATION;
// const bootstraprcCustomLocation = getBootstraprcCustomLocation();
//const bootstraprcCustomLocation = path.join(__dirname, process.env.BOOTSTRAPRC_LOCATION);
const bootstraprcCustomLocation = '/Users/robertsnith/Documents/PDFs001/isomorphic-react-bootstrap-loader-02/webpack/.bootstraprc';
// 'bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js';

console.log('>>>>>>>> webpack.bootstrap.config.js <<<<<<<<<<<<');

let defaultBootstraprcFileExists;

try {
  fs.statSync('./.bootstraprc');
  defaultBootstraprcFileExists = true;
} catch (e) {
  defaultBootstraprcFileExists = false;
}

if (!bootstraprcCustomLocation && !defaultBootstraprcFileExists) {
  console.log('You did not specify a \'bootstraprc-location\' ' + 'arg or a ./.boostraprc file in the root.');
  console.log('Using the bootstrap-loader default configuration.');
}

let bootstrapDevEntryPoint;
let bootstrapProdEntryPoint;

if (bootstraprcCustomLocation) {
  bootstrapDevEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?' + `configFilePath=${bootstraprcCustomLocation}` + '!bootstrap-loader/no-op.js';
} else {
  bootstrapDevEntryPoint = 'bootstrap-loader';
}

if (bootstraprcCustomLocation) {
  bootstrapProdEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?extractStyles' + `&configFilePath=${bootstraprcCustomLocation}` + '!bootstrap-loader/no-op.js';
} else {
  bootstrapProdEntryPoint = 'bootstrap-loader/extractStyles';
}

module.exports = {
  dev: bootstrapDevEntryPoint,
  prod: bootstrapProdEntryPoint,
};
