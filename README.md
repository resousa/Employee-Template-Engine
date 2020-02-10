# Employee-Template-Engine

## Table of contents
- [General info](#Info)
- [Technologies](#Technologies)
- [Summary](#Summary)
- [Authors](#Authors)
- [License](#License)

### Info
![html](....)

This node based application takes in a set of coworkers. First the user inputs a manager and some details about them. Then the user inputs engineers and interns. The user can create as many engineers and interns as needed to create their team org chart. Once the user has input all data an html page is created. 

### Technologies

Project created with :
- [node.js](https://nodejs.org/en/)
- [Bootstrap](https://getbootstrap.com/)

#### npm packages
- [inquirer](https://www.npmjs.com/package/inquirer)
- [jest](https://www.npmjs.com/package/jest)
- [fs](https://www.npmjs.com/package/fs)


### Summary

The employee template engine takes in user input with node.js. The user must first input details about a the manager. These details include the manager's name, id, email, and office number. The user the has the choice to add engineers or interns. If the user chooses to add an engineer the user must input the engineer's name, id, email, and github user name. The user will then have the option to add addtional engineers or interns. If the user selects the intern the user must input the intern's name, id, email, and university. Once the user has input the desired amount of coworkers an HTML document will be created in the output folder.

![node](....)

### Authors

- Ryan Sousa

### License

- MIT License Copyright (c) 2020 Ryan Sousa
