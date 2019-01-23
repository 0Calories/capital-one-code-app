const request = require('request');

const fileParser = require('./src/file-parser');

module.exports = app => {

  // WebHook handler for when a pull request is opened or edited
  app.on(['pull_request.opened', 'pull_request.edited'], async context => {
    
    // Pull off the neccessary data from the payload in order to get the files in the PR 
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;
    const number = context.payload.number;

    // List the files in this pull request so we can read them
    const files = await context.github.pullRequests.listFiles({ owner, repo, number });

    files.data.forEach(file => {
      // Check if the file is valid before parsing it
      // This line is true if this is not a file that starts with '.' and the file has an extension
      const validFile = file.filename.charAt(0) !== '.' && file.filename.split('.')[1];

      if (validFile) {
        // Fetch the content of the file
        request(file.raw_url, { json: false }, (err, res, body) => {
          // If there is an error, log it and return
          if (err) {
            app.log(err);
            return;
          }

          // app.log(body);
          fileParser.analyzeFile(body);
          //app.log(lineArray);
        });
      }
    });
  });
}

// Here's the script for testing the pull_request Webhook:
// node_modules/.bin/probot receive -e pull_request.opened -p test/fixtures/pull.request.opened.json ./index.js