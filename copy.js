const fs = require('fs-extra')
 
// Async with promises:
fs.copy('./src/index.css', './assets/index.css')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))