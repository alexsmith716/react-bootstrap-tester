
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// BOOTSTRAPRC_LOCATION = custom-bootstrap/.bootstraprc

function getBootstraprcCustomLocation() {
  return process.env.BOOTSTRAPRC_LOCATION;
}

const bootstraprcCustomLocation = getBootstraprcCustomLocation();

let bootstrapDevEntryPoint;
let bootstrapProdEntryPoint;

if (bootstraprcCustomLocation) {

  bootstrapDevEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?' +`configFilePath=${__dirname}/${bootstraprcCustomLocation}` +'!bootstrap-loader/no-op.js';
  bootstrapProdEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?extractStyles' +`&configFilePath=${__dirname}/${bootstraprcCustomLocation}` +'!bootstrap-loader/no-op.js';
  
} else {

  bootstrapDevEntryPoint = 'bootstrap-loader';
  bootstrapProdEntryPoint = 'bootstrap-loader/extractStyles';

}

console.log('>>>>>>>> webpack.bootstrap.config.js > bootstrapDevEntryPoint: ', bootstrapDevEntryPoint);
console.log('>>>>>>>> webpack.bootstrap.config.js > bootstrapProdEntryPoint: ', bootstrapProdEntryPoint);

module.exports = {
  dev: bootstrapDevEntryPoint,
  prod: bootstrapProdEntryPoint,
};
