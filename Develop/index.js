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
              "[MIT License](/LICENSE.txt)", 
              "[GNU GPLv3 License](/COPYING.txt)", 
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

## Table of Contents

1. [Project Description](#project-description)
2. [Installation Instructions](#installation-instructions)
3. [Usage Information](#usage-information)
4. [Contributor Guidelines](#contributor-guidelines)
5. [Code of Conduct](#code-of-conduct)
6. [Test Instructions](#test-instructions)
7. [License](#license)
8. [Credits](#credits)

## Project Description

* ${answers.description}

## Installation Instructions

* ${answers.install}

## Usage Information

* ${answers.use}

## Contributor Guidelines

* ${answers.contributions}

## Code of Conduct

* [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)

## Test Instructions

* ${answers.test}

## License

* licensed under the ${answers.license}.

## Credits

* [GitHub](http://github.com/${answers.github})`;
}

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