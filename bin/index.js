#! /usr/bin/env node
'use strict';

const argv = require('yargs').argv;
const fs = require('fs');
const yaml = require('js-yaml');
const populater = require('../populater');

const config = {
  app: `${process.cwd()}/${argv.app? argv.app : 'app.js'}`,
  mongoose: `${process.cwd()}/node_modules/mongoose`,
  file: argv.file || 'populater.yml',
  reset: argv.reset? true: false
};

function getObject(file){
  const toObjectFrom = {
    yml: function(){
      return yaml.safeLoad(fs.readFileSync(`${process.env.PWD}/${file}`, 'utf8'));
    },
    js: function(){
      return require(`${process.env.PWD}/${file}`);
    }
  }
  let format = file.split('.').slice(-1)[0];
  return toObjectFrom[format]();
}

async function init(){
  try {
    const app = require(config.app);
    const mongoose = require(config.mongoose);
    mongoose.connection.on('connected', function(){
      if(config.reset) {
        mongoose.connection.db.dropDatabase();
        console.log('\x1b[32m%s\x1b[0m','Base de datos borrada.');
      }
    });


    const models = getObject(config.file);
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
