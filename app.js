const getNotes = require('./notes');
const validator = require ('validator');
const chalk = require('chalk');
console.log(getNotes());
console.log(validator.isEmail("hritvik@gmail.com"));
console.log(chalk.green("Success!"));