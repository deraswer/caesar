const fs = require('fs')

let savewrite = (name, data) => {
    fs.writeFile(name, data, () => {});
};

module.exports = savewrite