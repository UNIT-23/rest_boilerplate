#!/usr/bin/env node
const commander = require('commander');
const inquirer = require('inquirer');
const fs = require('fs')
const Path = require('path')

fs
  .readdirSync(__dirname)
  .forEach(function (dir) {
    const commandDir = Path.join(__dirname, dir)
    if (fs.lstatSync(commandDir).isDirectory()) {
      require(commandDir)(commander,inquirer);
    }
  })


commander.parse(process.argv);