# GenericSuite (frontend version)
The GenericSuite for ReactJS (frontend version).

![GenericSuite Logo](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/lib/images/gs_logo_circle.svg)

Welcome to GenericSuite, a comprehensive software solution designed to enhance your productivity and streamline your workflows. This repository contains the front-end component of GenericSuite, equipped with a customizable CRUD editor, login interface and a suite of tools to kickstart your development process.

## Features

- **Customizable CRUD editor:** core CRUD (Create-Read-Update-Delete) code that can be parametrized and extended by JSON configuration files. There's no need to rewrite code for each table editor.
- **Customizable menu:** menu and endpoints can be parametrized and extended by JSON configuration files in the backend side. The API will supply the menu estructure and security check based on the user's security group, and GenericSuite will draw the menu and available options.
- **Customizable Login Interface:** Easily adapt the login page to match your brand identity with the App logo.
- **Development and Production Scripts:** Quick commands to start development or build your application for QA, staging production environments on AWS.
- **Testing with Jest:** Comes pre-configured with Jest for running tests, including an initial test for the `<App />` component.
- **Inclusion of Essential Files:** `.env.example` for environment variables setup, `Makefile` to short-cut frecuent operations, `webpack.config.js` and `config-overrides.js` to run the App locally with `Webpack` or `react-app-rewired`, `scripts` with development and production scripts, 
 and `CHANGELOG.md` for tracking changes across versions.

The perfect companion for this frontend solution is the backend version of Genericsuite:<br/>
[https://github.com/tomkat-cr/genericsuite-be](https://github.com/tomkat-cr/genericsuite-be)

There's a version of this library with AI features. The Genericsuite AI:<br/>
[https://github.com/tomkat-cr/genericsuite-fe-ai](https://github.com/tomkat-cr/genericsuite-fe-ai)


## Pre-requisites

You need to install these tools:

- Node 18+
- Git
- Make

## Getting Started

To get started with GenericSuite, follow these simple steps:

1. **Initiate your project**

   Change to your frontend local development directory and run:

   ```bash
   npm init
   ```

   And:

   ```bash
   git init
   ```

2. **Install Library**

   ```bash
   npm install genericsuite
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Prepare the Configuration File**:

   Copy the template from `node_modules/genericsuite`:

   ```bash
   cp node_modules/genericsuite/.env.example ./.env
   ```
   
   And configure the variables according your needs:

   1. Replace `exampleapp` with your App's name.

   2. Replace `url-qa`, `url-staging` and `url-prod` with the corresponding public domain names for your App environments.

   3. Configure your desired `RUN_METHOD`. Available options are "webpack" and "react-scripts". Defaults to "webpack".

   4. Configure `BACKEND_PATH` with the path for your backend API local development repo.

   5. Configure `GITHUB_USERNAME` and `GITHUB_REPONAME`. It will be used by `scripts/aws_deploy_to_s3.sh` to change the `homepage` in `package.json` with the proper public domain during the AWS S3 deploytment and restores to GITHUB_USERNAME.github.io/GITHUB_REPONAME after that.

   6. Configure `GIT_SUBMODULE_LOCAL_PATH` and `GIT_SUBMODULE_URL` with the JSON files submodule parameters to stablish a common configuraton place for both frontend and backend (used by add_github_submodules.sh).<BR/>For example files, visit: [https://github.com/tomkat-cr/genericsuite-fe/tree/main/src/configs](https://github.com/tomkat-cr/genericsuite-fe/tree/main/src/configs)

   7. Configure the `AWS_*` parameters with your AWS data (used by aws_deploy_to_s3.sh and change_env_be_endpoint.sh). You'll need an AWS account.

5. **Prepare the Makefile**

   Copy the template from `node_modules/genericsuite`:

   ```bash
   cp node_modules/genericsuite/Makefile ./Makefile
   ```
   
   Open the `Makefile` and replace all `scripts/` with  `node_modules/genericsuite/scripts/`

   ```bash
   vi ./Makefile
   # or
   code ./Makefile
   ```

6. **Change Scripts in Package.json**

   Open the `package.json`:

   ```bash
   vi ./package.json
   # or
   code ./package.json
   ```

   Add the homepage parameter:

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

7. **Start Development Server**

To start the development server:

   ```bash
   make run
   ```

8. **Deploy QA**

To perform a QA deployment over AWS S3:

   ```bash
   make deploy_qa
   ```

## License

GenericSuite is open-sourced software licensed under the MIT license.

## Credits

This project is developed and maintained by Carlos J. Ramirez. For more information or to contribute to the project, visit [GenericSuite on GitHub](https://github.com/tomkat-cr/genericsuite-fe).

Happy Coding!