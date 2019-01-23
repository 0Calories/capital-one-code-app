// Analyzes a file by counting # of lines, # of comments, and # of TODOs
const analyzeFile = file => {
  // Initialize variables for parsing the file
  let numLines = 0;
  let numCommentLines = 0;
  let numSingleLineComments = 0;
  let numBlockCommentLines = 0;
  let numBlockComments = 0;
  let numTodos = 0;

  let commentLines = [];
  let commentBlockFlag = false;

  // Break up the file into an array of lines so that it can be parsed easier
  const lines = file.split('\n');
  numLines = lines.length;

  // Parse each line
  lines.forEach(line => {
    // Trim the line so we don't have to worry about whitespace and tabs
    line = line.trim();
    line = line.normalize()
    // Segregate the comment lines into their own individual array for further parsing later on
    const isCommentLine = line.substring(0, 2) === '//' || line.substring(0, 2) === '/*' || line.substring(0, 2) === '*/' || line.substring(line.length - 2, line.length) == '*/';
    const hasTrailingComment = !isCommentLine && (line.includes('//') || line.includes('/*') || line.includes('*/'))

    // If the line starts with '/*', activate the commentBlockFlag so all subsequent lines are counted as comments
    // If the line ends with '*/', a comment block was escaped so disable the flag
    if (line.substring(0, 2) === '/*' || line.includes('/*')) 
      commentBlockFlag = true;
    else if (line.substring(line.length - 2, line.length) == '*/')
      commentBlockFlag = false;
    
    if (isCommentLine || hasTrailingComment || commentBlockFlag) {
      commentLines.push(line);
    } 
  });

  // Parse the comment lines
  commentLines.forEach(line => {

    //const isTrailingComment = line.includes('//') || line.includes('/*') || line.includes('*/');

    if (line.substring(0, 2) === '//' || line.includes('//')) 
      numSingleLineComments++;
    else if (line.substring(0, 2) == '/*') 
      numBlockComments++;
    
    if (line.includes('TODO:'))
      numTodos++;

  });

  console.log(lines);
  console.log(commentLines);

  console.log(`Total # of lines: ${numLines}`);
  console.log(`Total # of comment lines: ${commentLines.length}`);
  console.log(`Total # of single line comments: ${numSingleLineComments}`);
  console.log(`Total # of comment lines within block comments: ${numBlockCommentLines}`);
  console.log(`Total # of block comments: ${numBlockComments}`);
  console.log(`Total # of TODO's: ${numTodos}`);
};


module.exports = { analyzeFile };