
# Magical Arena Backend

## Table of Contents
- [How to run the backend:](#how-to-run-the-backend)
- [Folder Structure](#folder-structure)
- [Testing](#testing)
- [Dependencies](#dependencies)

## How to run the backend:

**Start the Server using:**
   ```sh
   npm start
   ```

## Folder Structure
Here's an overview of the folder structure of the backend:

```
magical-arena-backend
├── node_modules
├── src
│   ├── tests
│   │   ├── Arena.test.ts
│   │   ├── DieRoll.test.ts
│   │   ├── Player.test.ts
│   │   └── server.test.ts
│   ├── utils
│   │   ├── DieRoll.ts
│   ├── Arena.ts
│   ├── Player.ts
│   └── server.ts
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
```

- **src**: Contains the main source code of the project.
  - **tests**: Contains the unit tests for various modules.
  - **utils**: Contains utility modules.
  - `Arena.ts`: Module related to the arena logic.
  - `Player.ts`: Module related to player logic.
  - `server.ts`: Entry point of the backend server.

- **.gitignore**: Specifies files and directories to be ignored by git.
- **jest.config.js**: Configuration file for Jest.
- **package-lock.json**: Automatically generated file that ensures consistent installs.
- **package.json**: Lists dependencies and scripts.
- **tsconfig.json**: Configuration file for TypeScript.

## Testing
To run the tests, use the following command:

```sh
npm test
```

Jest is used as the testing framework, and test files are located in the `src/tests` directory. Each module has its corresponding test file to ensure the functionality and reliability of the code.

## Dependencies
### Dev Dependencies
- `@types/body-parser`
- `@types/cors`
- `@types/express`
- `@types/jest`
- `@types/node`
- `jest`
- `supertest`
- `ts-jest`
- `ts-node`
- `typescript`

### Dependencies
- `body-parser`
- `cors`
- `express`

## Author
Shashwat Singh