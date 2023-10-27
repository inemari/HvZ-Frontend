# HvZ Game Management System - Front-End 

## Project Overview

The HvZ Game Management System is a web-based application that provides a digital platform for managing Humans vs. Zombies (HvZ) games. The front-end codebase of this system is responsible for delivering a user-friendly and intuitive interface for both administrators and players.


## Getting Started
<b>NB!:</b> You need to have installed the requirements for the back-end repository before running the development server, unless it won't run correctly. <br>

### Prerequisities
- Visual Studio Code
- Node.js (20.8.1) <br>
---
- <b>NB!:</b>Ensure to reboot your pc, and check that the path installation is setup correctly for Node.js.

### Installation and Setup
To set up the HvZ Game Management System Front-End on your local machine, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Access the application in your web browser at `http://localhost:3000`

6. Configure the Keycloak Server
- Configure the Keycloak server in a `Keycloak.json` file. Place this within the public folder. Configuration details can be found in your Keycloak Admin Console.
- In Keycloak Admin Console make a new Realm.
- In the realm you need to add 'admin' and 'user' roles to users for the keycloak checks to pass in the system. This can be done in the Roles tab. You can also add 'user' as a default if you'd like.
- You need to make a client for the application in your realm. In the client you can make 'User Realm Role' and 'User Client Role' mappers. Set the token claim names to "roles".
- In the 'Users' tab in the Admin Console, you can add role mappings to users to assign the roles you've made, for both the Realm itself and the client.

7. Add a `.env` file in the root of the project, and add this line:

`REACT_APP_API_URL= your_api_url` 

## Usage
To start start the application, run `npm start` in the terminal of your project directory. After running the command, the web browser will open your localhost where you can interact with the application.

## Contributors
- [Tommy Jåvold](https://github.com/t-lined)
- [Ine Mari Bredesen](https://github.com/inemari)
- [Tobias Vetrhus](https://github.com/TobiasVetrhus)
- [Ritwaan Hashi](https://github.com/Ritwaan)
- [Noah Høgstøl](https://github.com/Nuuah)
