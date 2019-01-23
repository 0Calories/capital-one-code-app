module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!');

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' });
    return context.github.issues.createComment(issueComment);
  });

  app.on('push', async context => {
    const owner = context.payload.repository.owner.name;
    const repo = context.payload.repository.name;
    const commit_sha = context.payload.head_commit.id;
    // app.log(`Owner: ${owner}, Repo: ${repo}, commit_sha: ${commitId}`);
    
     const result = await context.github.gitdata.getCommit({ owner, repo, commit_sha });
     app.log(result);
  });

  app.on(['pull_request.opened', 'pull_request.edited'], async context => {
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;
    const number = context.payload.number;

    app.log(`Owner: ${owner}, Repo: ${repo}, number: ${number}`);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
