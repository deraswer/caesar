const readline = require("readline");
const Q = require('q')

let doRead = () => {
  let deferred = Q.defer();
  let r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  process.stdout.write('\033c');
  r.question("Give me a text --> ", function (str) {
    str = String(str);
    r.close();
    deferred.resolve(str);
  });
  
  return deferred.promise;
};
module.exports = doRead