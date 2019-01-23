const request = require('request');

const fileParser = require('./src/file-parser');

module.exports = app => {

  // WebHook handler for when a pull request is opened or edited
  app.on(['pull_request.opened', 'pull_request.edited'], async context => {
    // Pull off the neccessary data from the payload in order to get the files in the PR 
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;
    const number = context.payload.number;

    // List the files in this pull request so we can read them, but wait a few seconds first (reading too quickly causes issues)
    const files = await context.github.pullRequests.listFiles({ owner, repo, number });
    const headFile = files.data[0];
    const reviewComments = [];

    // Initialize a review string, this will be posted on the PR when file analysis is complete
    let reviewString = '';

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

          const results = fileParser.analyzeFile(body);
          const commentString = `
            ###${file.filename}
            Total \# of lines: ${results.numLines}
            Total \# of comment lines: ${results.numCommentLines}
            Total \# of single line comments: ${results.numSingleLineComments}
            Total \# of comment lines within block comments: ${results.numBlockCommentLines}
            Total \# of block comments: ${results.numBlockComments}
            Total \# of TODO's: ${results.numTodos}
          `;

          reviewComments.push({
            path: file.filename,
            position: 1,
            body: commentString
          });
        });
      }
    });

    

    // Post a review containing the code analysis
    setTimeout(() => {
      const requestObj = {
        owner,
        repo,
        number,
        comments: reviewComments
      };

      return context.github.pullRequests.createReview(requestObj);
    }, 1000);
    
  });
}

// Here's the script for testing the pull_request Webhook:
// node_modules/.bin/probot receive -e pull_request.opened -p test/fixtures/advanced.pull.request.json ./index.js