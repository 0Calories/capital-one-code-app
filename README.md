# capital-one-code-analyzer

A GitHub app that analyzes code to read things like number of lines, comments, and TODOs for all files when a Pull Request is made. Made for the CapitalOne technical assessment

## Notes
Unfortunately, the GitHub API doesn't seem to allow a way to read code as soon as it is checked in, but it can read code when a Pull Request is made. Due to this, I designed the app so that it will comment analysis results on individual files in the form of a review on PRs.

## How to test

1. If you would like to test the GitHub app for yourself, you first need to create a repository on GitHub (or have an existing one)
2. Once your repo is ready, go to this link to get the app: https://github.com/apps/capital-one-code-analyzer
3. You can then install the app on the repository you want to test on
4. Create a new branch on your repo, commit and push some code to it, and open a Pull Request. Here's some sample code you can steal for testing:

```
// Here's a second file to test the parsing on 
/* Obligatory
 * Block
 * Comment
*/

const a = 1;
const b = 2;
const c = 3;

const person = {
	name: 'Ash',
	age: 22,
	hometown: 'Ottawa' // Born and raised
};

// Comment 
/* Another
block
comment */
```

5. Once the Pull Request has been opened, the app will automatically analyze the files and leave a review (example below)

![Code Analyzer Example](https://i.imgur.com/uVkzjD3.png)


## License

[ISC](LICENSE) © 2019 Ash Anand
