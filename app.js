"use strict";

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const writeFileAsync = util.promisify(fs.writeFile);

async function init() {
  await managerInput();
  await coworkerInput();
  await createHTML();
}

init();

const coworkersArr = [];

async function managerInput() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Manager's name:"
      },
      {
        type: "input",
        name: "id",
        message: "ID number:"
      },
      {
        type: "input",
        name: "email",
        message: "Manager's e-mail:"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Manager's office number:"
      }
    ])
    .then(answers => {
      const newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      coworkersArr.push(newManager);
    });
}

async function coworkerInput() {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "coworker",
        choices: [
          "Engineer",
          "Intern",
          "I am finished"
        ],
        message: "Which position would you like to add?"
      }
    ])
    .then(async choice => {
      if (choice.coworker === "Engineer") {
          await engineerInput();
          await coworkerInput();
      }
      else if (choice.coworker === "Intern") {
          await internInput();
          await coworkerInput();
      }
      else {
          console.log("Org Chart created");
      }
    });
}

async function engineerInput() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Engineer's name:"
      },
      {
        type: "input",
        name: "id",
        message: "ID number:"
      },
      {
        type: "input",
        name: "email",
        message: "Engineer's e-mail:"
      },
      {
        type: "input",
        name: "github",
        message: "Engineer's GitHub username:"
      }
    ])
    .then(answers => {
      const newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      coworkersArr.push(newEngineer);
    });
}

async function internInput() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Intern's name:"
      },
      {
        type: "input",
        name: "id",
        message: "ID number:"
      },
      {
        type: "input",
        name: "email",
        message: "Intern's e-mail:"
      },
      {
        type: "input",
        name: "school",
        message: "Intern's university:"
      }
    ])
    .then(answers => {
      const newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      coworkersArr.push(newIntern);
    });
}

async function createHTML() {
  const coworkerArrHTML = [];

  for (const coworker of coworkersArr) {
    const coworkerInfoHTML = generateCoworkerCards(coworker);
    coworkerArrHTML.push(coworkerInfoHTML);
  }

  const html = generateHTML(coworkerArrHTML.join(" "));
  await writeFileAsync(__dirname + "/output/team.html", html);
}

const generateCoworkerCards = answers => {     
  if (answers.github === undefined && (answers.school === undefined)) {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${answers.name}</h5>
      <p class="card-text">Manager</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${answers.id}</li>
      <li class="list-group-item">Email: ${answers.email} </li>
      <li class="list-group-item">Office Number: ${answers.officeNumber}</li>
    </ul>
  </div>`;
  } else if (answers.school === undefined) {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${answers.name}</h5>
      <p class="card-text">Engineer</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${answers.id}</li>
      <li class="list-group-item">Email: ${answers.email} </li>
      <li class="list-group-item">GitHub: ${answers.github}</li>
    </ul>
  </div>`;
  } else {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${answers.name}</h5>
      <p class="card-text">Intern</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${answers.id}</li>
      <li class="list-group-item">Email: ${answers.email} </li>
      <li class="list-group-item">School: ${answers.school}</li>
    </ul>
  </div>`
  }
};

const generateHTML = coworkerInfo => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Org Chart</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
  </head>
  <body>
      <nav class="navbar" style="background-color: #81caff;">
          <span class="navbar-brand h1 font-weight-bold mx-auto">Team Org Chart</span>
        </nav>
        <div class="container">
          <div class="row d-flex justify-content-around">
            ${coworkerInfo}
          </div>
  </body>
  </html>`;
};