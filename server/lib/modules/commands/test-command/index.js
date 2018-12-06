
const actions = require('./actions')

module.exports = (commander,inqueirer) => {

  commander
    .version('0.0.1')
    .command('hello') 
    .alias('hw')
    .description('Hello World')
    .action(actions.helloAction);
    
  
}