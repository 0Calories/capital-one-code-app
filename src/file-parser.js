// Analyzes a file by counting # of lines, # of comments, and # of TODOs
const analyzeFile = file => {
  // Initialize counter variables for parsing the file
  let numLines;
  let numCommentLines;
  let numSingleLineComments;
  let numBlockCommentLines;
  let numBlockComments;
  let numTodos;

  // Break up the file into an array of lines so that it can be parsed easier
  const lines = file.split('\n');
  numLines = lines.length;

  // Parse each line
  
};


module.exports = { analyzeFile };