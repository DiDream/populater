#! /usr/bin/env node
'use strict';

const argv = require('yargs').argv;
const fs = require('fs');
const yaml = require('js-yaml');
const populater = require('../populater');

const requires = {
  app: `${process.cwd()}/${argv.app? argv.app : 'app.js'}`,
  mongoose: `${process.cwd()}/node_modules/mongoose`,
};
const config = {
  file: argv.file || 'populater.yml',
  reset: argv.reset? true: false
};



async function init(){
  try {
    const app = require(requires.app);
    const mongoose = require(requires.mongoose);
    mongoose.connection.on('connected', function(){
      if(config.reset) {
        mongoose.connection.db.dropDatabase();
        console.log('\x1b[32m%s\x1b[0m','Base de datos borrada.');
      }
    });

    const models = yaml.safeLoad(fs.readFileSync(`${process.env.PWD}/${config.file}`, 'utf8'));
    await populater(models, mongoose);
    console.log('\x1b[32m%s\x1b[0m', 'registros creados');
    process.exit(0);
  }
  catch (err) {
    console.error('\x1b[31m%s\x1b[0m', err.message);
    console.log(err.stack);
    process.exit(1);
  }
}
init();
