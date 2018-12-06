const sequelizeOps =  require('./sequelizeOps')


const  replaceKeyDeep = (obj, keyMap) => {
  return Object.keys(obj).reduce((memo, key)=> {

    // determine which key we are going to use
    const targetKey = keyMap[key] ? keyMap[key] : key;

    if (Array.isArray(obj[key])) {
      // recurse if an array
      memo[targetKey] = obj[key].map((val) => {
        if (Object.prototype.toString.call(val) === '[object Object]') {
          return replaceKeyDeep(val, keyMap);
        }
        return val;
      });
    } else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      // recurse if Object
      memo[targetKey] = replaceKeyDeep(obj[key], keyMap);
    } else {
      // assign the new value
      memo[targetKey] = obj[key];
    }

    // return the modified object
    return memo;
  }, {});
}


module.exports = where => {
  return replaceKeyDeep(where, sequelizeOps);
}