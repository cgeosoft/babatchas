const fs = require('fs');

fs.writeFileSync('src/_data/build.yml', `date: '${new Date().toISOString().substring(0, 16).replace("T", " ")} UTC'`);
