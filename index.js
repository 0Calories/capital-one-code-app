module.exports = app => {

  // WebHook handler for when a pull request is opened or edited
  app.on(['pull_request.opened', 'pull_request.edited'], async context => {
    
    // Pull off the neccessary data from the payload in order to get the files in the PR 
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;
    const number = context.payload.number;

    app.log(`Owner: ${owner}, Repo: ${repo}, number: ${number}`);

    // List the files in this pull request so we can read them
    const result = await context.github.pullRequests.listFiles({ owner, repo, number });
    app.log(result);
  });
}

// Here's the script for testing the pull_request Webhook:
// node_modules/.bin/probot receive -e pull_request.opened -p test/fixtures/pull.request.opened.json ./index.js