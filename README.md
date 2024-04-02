# GenericSuite for ReactJS (frontend version)

![GenericSuite Logo](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/lib/images/gs_logo_circle.png)

Welcome to GenericSuite, a comprehensive software solution designed to enhance your productivity and streamline your workflows. This repository contains the frontend part of GenericSuite, equipped with a customizable CRUD editor, login interface and a suite of tools to kickstart your development process.

## Features

- **Customizable CRUD editor:** core CRUD (Create-Read-Update-Delete) code that can be parametrized and extended by JSON configuration files. There's no need to rewrite code for each table editor.
- **Customizable menu:** menu and endpoints can be parametrized and extended by JSON configuration files in the backend side. The API will supply the menu estructure and security check based on the user's security group, and GenericSuite will draw the menu and available options.
- **Customizable Login Interface:** Easily adapt the login page to match your brand identity with the App logo.
- **Development and Production Scripts:** Quick commands to start development or build your application for QA, staging production environments on AWS.
- **Testing with Jest:** Comes pre-configured with Jest for running tests, including an initial test for the `<App />` component.
- **Inclusion of Essential Files:** `.env.example` for environment variables setup, `Makefile` to short-cut frequent operations, `webpack.config.js` and `config-overrides.js` to run the App locally with `Webpack` or `react-app-rewired`, `scripts` with development and production scripts, 
 and `CHANGELOG.md` for tracking changes across versions.

The perfect companion for this frontend solution is the [backend version of The GenericSuite](https://github.com/tomkat-cr/genericsuite-be).

There's a version of this library with AI features: [The GenericSuite AI](https://github.com/tomkat-cr/genericsuite-fe-ai).

## Pre-requisites

You need to install these tools:

- Node version 18+, installed via [NVM (Node Package Manager)](https://nodejs.org/en/download/package-manager) or [NPM and Node](https://nodejs.org/en/download) install.
- [Git](https://www.atlassian.com/git/tutorials/install-git)
- Make: [Mac](https://formulae.brew.sh/formula/make) | [Windows](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows)

## Getting Started

To get started with GenericSuite, follow these steps:

### Initiate your project

Create the ReactJs App. E.g. `exampleapp_frontend`:

```bash
npx create-react-app exampleapp_frontend
```

It automatically performs the `npm init` and `git init`, adds the ReactJS dependencies, and creates a default ReactJS project structure.

NOTE: Check the documentation [here](https://react.dev/learn/start-a-new-react-project) for CRA (`create-react-app`) alternatives.

Change to your frontend local development directory.<br/>
```bash
cd exampleapp_frontend
```

CRA (`create-react-app`) is outdated, so we use [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) to customize CRA configuration with no need to eject:

```bash
npm install --save-dev react-app-rewired
```

### Install the GenericSuite Library

```bash
npm install genericsuite
```

### Install additional development dependencies

```bash
npm install --save-dev \
   @babel/cli \
   @babel/core \
   @babel/plugin-proposal-class-properties \
   @babel/plugin-proposal-private-property-in-object \
   @babel/plugin-syntax-jsx \
   @babel/preset-env \
   @babel/preset-react \
   @babel/preset-stage-0 \
   @babel/preset-typescript \
   @testing-library/jest-dom \
   @testing-library/react \
   @testing-library/user-event \
   @types/jest \
   @types/react \
   babel-jest \
   babel-loader \
   babel-plugin-css-modules-transform \
   file-loader \
   html-webpack-plugin \
   jest \
   jest-environment-jsdom \
   path \
   postcss \
   postcss-loader \
   react-test-renderer \
   style-loader \
   tailwindcss \
   url-loader \
   webpack \
   webpack-cli \
   webpack-dev-server \
   whatwg-fetch
```

### Prepare the Configuration Files

Copy the `.env` file template from `node_modules/genericsuite`:

```bash
cp node_modules/genericsuite/.env.example ./.env
```

And configure the variables according your needs:

1. Assign `REACT_APP_APP_NAME` with your App's name.

2. Assign `APP_LOCAL_DOMAIN_NAME` with the local development environment backend API domain name. E.g. app.exampleapp.local or localhost.<BR/>
Defaults to app.${REACT_APP_APP_NAME}.local (the REACT_APP_APP_NAME will be converted to all lowercase).

2. Assign `FRONTEND_LOCAL_PORT` with the port number for the local development environment backend API. Defaults to 3000.

3. Assign `BACKEND_LOCAL_PORT` with the port number for the local development environment backend API. Defaults to 5000.

4. Assign `APP_API_URL_QA`, `APP_API_URL_STAGING`, `APP_API_URL_PROD`, and `APP_API_URL_DEMO` with the corresponding public backend API domain names for your App environments.

5. Assign `APP_FE_URL_QA`, `APP_FE_URL_STAGING`, `APP_FE_URL_PROD`, and `APP_FE_URL_DEMO` with the corresponding public frontend domain names for your App environments.

6. Assign `REACT_APP_URI_PREFIX` with the App URI prefix. This will be used in all environments after the domain name. E.g. https://app.exampleapp.com/exampleapp_frontend

7. Configure your desired `RUN_METHOD`. Available options are "webpack" and "react-scripts". Defaults to "webpack".

8. Configure `BACKEND_PATH` with the path for your backend API local development repo.

9. Configure `GIT_SUBMODULE_LOCAL_PATH` and `GIT_SUBMODULE_URL` with the JSON files submodule parameters to stablish a common configuration place for both frontend and backend (used by add_github_submodules.sh).<BR/>For example files, visit: [Generic Suite Configuration Guide](https://github.com/tomkat-cr/genericsuite-fe/tree/main/src/configs)

10. Configure the `AWS_*` parameters with your AWS data (used by aws_deploy_to_s3.sh and change_env_be_endpoint.sh). You'll need an AWS account.

For more information, check the comments for each variable in the [.env.example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/.env.example) file.

### Prepare the Makefile

Copy the `Makefile` template from `node_modules/genericsuite`:

```bash
cp node_modules/genericsuite/Makefile ./Makefile
```

### Change Scripts in Package.json

Open the `package.json`:

```bash
vi ./package.json
# or
# code ./package.json
```

If you want to host your frontend on **github.io**, add the homepage parameter:

```package.json
"homepage": "https://your-github-username.github.io/your-github-repository/",
```
```
NOTE: replace `your-github-username` and `your-github-repository` with your owns.
```

Add the following scripts:

```package.json
   "scripts": {
      "start": "node server.js",
      "start-build": "./node_modules/react-app-rewired/bin/react-app-rewired.js build && node server.js",
      "start-debug": "ls -lah && node server.js",
      "start-dev": "react-app-rewired start",
      "start-dev-webpack": "npx webpack-dev-server --config webpack.config.js",
      "build-prod": "webpack --mode production",
      "build-dev": "react-app-rewired build",
      "build": "react-app-rewired build",
      "eject-dev": "react-scripts eject",
      "test-dev": "react-app-rewired test",
      "test": "jest",
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
   },
```

## App structure

This is a suggested App development repository structure:

```
.
├── .babelrc
├── .env
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── Makefile
├── README.md
├── babel.config.js
├── config-overrides.js
├── jest.config.cjs
├── package-lock.json
├── package.json
├── public
├── server.js
├── src
│   ├── components
│   │   ├── About
│   │   │   └── About.jsx
│   │   ├── App
│   │   │   ├── App.jsx
│   │   │   └── App.test.tsx
│   │   ├── HomePage
│   │   │   ├── HomePage.jsx
│   │   ├── ExampleMenu
│   │   │   ├── ExampleMainElement.jsx
│   │   │   └── ExampleChildElement.jsx
│   ├── constants
│   │   └── app_constants.jsx
│   ├── images
│   │   ├── app_logo_circle.svg
│   │   └── madeby_logo_square.svg
│   ├── configs
│   │   ├── CHANGELOG.md
│   │   ├── README.md
│   │   ├── backend
│   │   │   ├── app_main_menu.json
│   │   │   ├── endpoints.json
│   │   │   ├── general_config.json
│   │   │   ├── example_main_element.json
│   │   │   └── example_child_element.json
│   │   └── frontend
│   │       ├── app_constants.json
│   │       ├── general_constants.json
│   │       ├── users_profile.json
│   │       ├── example_main_element.json
│   │       └── example_child_element.json
│   ├── d.ts
│   ├── index.jsx
│   ├── input.css
│   └── setupTests.js
├── tailwind.config.js
├── tsconfig.json
├── version.txt
└── webpack.config.js
```

## Configure the project

In the project's directory:

- `.babelrc` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/.babelrc))<br/>
- `babel.config.js` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/babel.config.cjs))<br/>
Babel transpiler configuration. Check the [documentation here](https://babeljs.io/docs/configuration).<br/><br/>
- `CHANGELOG` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/CHANGELOG.md))<br/>
Changes documentation to this project.<br/><br/>
- `config-overrides.js` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/config-overrides.js))<br/>
react-app-rewired configuration. Check [react-app-rewired documentation](https://github.com/timarney/react-app-rewired) for more information.<br/><br/>
- `jest.config.cjs` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/jest.config.cjs))<br/>
JEST test configuration.<br/><br/>
- `server.js` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/server.js))<br/>
Node server, to test and debug your App in a production-like environment.<br/><br/>
- `tailwind.config.js` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/tailwind.config.js))<br/>
Tailwind configuration. Check the [documentation here](https://tailwindcss.com/docs/configuration).<br/><br/>
- `webpack.config.js` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/webpack.config.js))<br/>
To configure Webpack as an alternative to CRA / `react-app-rewired`. Check the [documentation here](https://webpack.js.org/configuration).<br/><br/>
- `tsconfig.json`<br/>
To configure TypeScript. e.g.
```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "ESNext",
    "moduleResolution": "node",
    "target": "es5",
    "lib": [
      "es6",
      "dom"
    ],
    "sourceMap": true,
    "allowJs": true,
    "checkJs": false,
    "jsx": "react",
    "baseUrl": "./src/lib",
    "rootDirs": [
      "src/lib"
    ],
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationDir": "types",
    "emitDeclarationOnly": true,
    "paths": {
      "src/*": ["./src/*"],
    }
  },
  "include": [
    "src/**/*",
  ]
}
```

## Code examples and JSON configuration files

The main menu, API endpoints and CRUD editor configurations are defined in the JSON configuration files.

You can find examples about configurations and how to code an App in the [GenericSuite App Creation and Configuration guide](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/configs/README.md).

## Start Development Server

To start the development server:

```bash
make run
```

## Deploy QA

To perform a QA deployment over AWS S3:

```bash
make deploy_qa
```

## License

GenericSuite is open-sourced software licensed under the ISC license.

## Credits

This project is developed and maintained by Carlos J. Ramirez. For more information or to contribute to the project, visit [GenericSuite on GitHub](https://github.com/tomkat-cr/genericsuite-fe).

Happy Coding!