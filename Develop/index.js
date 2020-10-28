// NPM packages and standard libraries to require in
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// Promises for handling asynchronous behavior
const writeFileAsync = util.promisify(fs.writeFile);

// function to initialize program
function promptUser() {
    // array of questions for user
    return inquirer.prompt([
        {
            type: "input",
            name: "projecttitle",
            message: "What is the title of your project?"
          },
          {
            type: "input",
            name: "description",
            message: "What is the description of your project?"
          },
          {
            type: "input",
            name: "install",
            message: "What are the installation instructions?"
          },
          {
            type: "input",
            name: "use",
            message: "What is the usage information?"
          },
          {
            type: "input",
            name: "contributions",
            message: "What are the contribibutions guidelines?"
          },
          {
            type: "input",
            name: "test",
            message: "What are the test instructions?"
          },
          {
            type: "checkbox",
            message: "Which license is your application covered under?",
            name: "license",
            choices: [
              "License 1", 
              "License 2", 
              "License 3", 
              "License 4"
            ]
          },
          {
            type: "input",
            name: "github",
            message: "What is your github username?"
          }
        ]);
      }

// function to generate markdown for README
function generateREADME(answers) {
    return `# ${answers.projecttitle}
    ## Project Description
    * ${answers.description}
    ## Installation Instructions
    * ${answers.install}
    ## Usage Information
    * ${answers.use}
    ## Contributor Guidelines
    * ${answers.contribution}
    ## Test Instructions
    * ${answers.test}
    ## Project Licesnse
    * ${answers.license}
    ## Project Creator
    * ${answers.github}`;
    }
    
    //module.exports = generateMarkdown;

// function call to initialize program
promptUser()
  .then(function(answers) {
    const readme = generateREADME(answers);

    // function to write README file
    return writeFileAsync("README.md", readme);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });


//   // array of questions for user
// const questions = [

// ];

// // function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();