# CHANGELOG

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a Changelog](http://keepachangelog.com/).


## Unreleased
---

### New

### Changes

### Fixes

### Breaks


## 1.0.21 (2024-07-26)

### New
Add: ".nvmrc" file to set the repo default node version.

### Fixes
Fix: Fix audio processing issues in FastAPI Apps [GS-95].
Fix: error "Failed to execute 'atob' on 'Window': The string to be decoded contains characters outside of the Latin1" [GS-95].
Fix: '[object Object]' in getErrorMessage() 'reason' [GS-70].
Fix: "ReferenceError: fetch is not defined" error in npm test.
Fix: "ReferenceError: Response is not defined" error in npm test.
Fix: "Warning: ReactDOMTestUtils.act is deprecated in favor of React.act" in npm test.
Fix: "TypeError: (0 , _authenticationService.getUserData) is not a function" error in npm test.


## 1.0.20 (2024-05-17)
---

### New
Add AWS_SSL_CERTIFICATE_ARN env. var. for those cases where the SSL certificate cannot be found automatically in AWS certificate manager [FA-98].

### Changes
Change "npm_publish.sh" to show the current date/time at the end [FA-83].
Change: remove <a /> from "ACCOUNT_INACTIVE" in "app_constants.json".
Redirect README instructions to the GenericSuite Documentation [GS-73].

### Fixes
Fix the "ACM certificate ARN not found" error in "aws_deploy_to_s3.sh" and "aws_get_ssl_cert_arn.sh" by using AWS_SSL_CERTIFICATE_ARN env. var. [FA-98].
Fix "error-and-reenter.jsx" to log error in the JS console instead of showing "[object Object]" in the pop-up when "getErrorMessage" calls "extractErrorFromVariants" [FA-246].


## 1.0.19 (2024-04-20)
---

### New
Add FastAPI enhanced support [FA-246].

### Changes
".env.example" GIT_SUBMODULE_URL and AWS_S3_BUCKET_NAME_* variables with more descriptive values.
Customized "index.html" instructions to fix the frontend design when the project is created.
Add more instructions to project creation process in the "src/configs/README".
Change: README with main image from the official documentation site and .png version removed [FA-246].
Change: Homepage pointed to "https://genericsuite.carlosjramirez.com/Frontend-Development/GenericSuite-Core/" [FA-257].

### Fixes
Fix "Converting circular structure to JSON" error saving Child (array) sets with a "resultset" element in the "_old" value causing an infinite loop.


## 1.0.18 (2024-04-06)
---

### Fixes
Fix the labels color for required fields in the "generic.editor.rfc.formpage.jsx" data form.
Fix users and user_profile save error "Connection failure (Possible CORS): Failed to fetch [EFFF-010]" by removing "UsersDbPostWrite".

### Changes
Change "convertHeight" and "convertWeight" to validate parameters and avoid throwing an error the they are empty during the generic editor Create action.
Change "EditFormFormikFinal" to add the new Item created "id" to submitedtElements (data passed to processGenericFuncArray) before calling DbPostWrite.


## 1.0.17 (2024-04-01)
---

### New
Add `make deploy_demo` and `make config_demo` to manage the "demo" stage.
Add "demo" stage to REACT_APP_API_URL, and AWS_S3_BUCKET_NAME.
Add APP_FE_URL_DEV, APP_FE_URL_QA, APP_FE_URL_STAGING, APP_FE_URL_PROD, APP_FE_URL_DEMO variables to .env file, to be used by "aws_deploy_to_s3.sh" and "change_env_be_endpoint.sh" as the frontend domain.
Add the FRONTEND_LOCAL_PORT and BACKEND_LOCAL_PORT variables to .env file, to define the local frontend and backend port numbers.
Add "scripts/aws_get_ssl_cert_arn.sh" to verify the AWS ACM Certificate ARNs for the frontend and backend domains.

### Fixes
Fix "add_github_submodules.sh" to do "git submodule init", "git submodule sync" and "git pull --tags origin main" instead of "git checkout origin/main" to effectively pull the JSON configs from the git repository when the directory specified in "GIT_SUBMODULE_LOCAL_PATH" already exists and "git submodule add" was already run.

### Changes
The REACT_APP_API_URL_DEV, REACT_APP_API_URL_QA, REACT_APP_API_URL_STAGING, REACT_APP_API_URL_PROD, and REACT_APP_API_URL_DEMO variable names in the .env file were renamed to APP_API_URL_DEV, APP_API_URL_QA, APP_API_URL_STAGING, APP_API_URL_PROD, and APP_API_URL_DEMO.
The GITHUB_USERNAME and GITHUB_REPONAME variables are not longer required because "aws_deploy_to_s3.sh" just saves the existing value of "homepage" in package.json. Those 2 variables were removed from the .env file.
"aws_deploy_to_s3.sh" take into account the APP_FE_URL domain in the CloudFront distribution creation.
"make publish" report the package name and version in the publishing confirmation.
"run_app_frontend.sh" assign APP_API_URL_DEV and REACT_APP_API_URL in the "dev" stage for both http and https modes. Previously it was only made for http.
Node install links changed to include the NVM alternative download in the README.
License changed to ISC [FA-244].


## 1.0.16 (2024-03-21)
---

### New
Add AboutBodyGsFe and HomePageGsFe components to customize genericsuite-fe test run with "index.tsx".
Add test for LoginPage, GeneralConfig, Users, UserProfile, UsersConfig, AboutBodyGsFe and HomePageGsFe components.

### Changes
REACT_APP_GENERIC_SUITE_AI environment variable removed from webpack.config.js and .env.example.
"generic.editor.rfc.ai.button.jsx" removed. Its code was moved to genericSuite-fe-ai.
Debug turned off on <App/>, <SearchEngineButton/> and handleFetchError().

## Fixes
**Fix "dictToAdd" precedence over "originDict" in mergeDicts()** to allow the referring App to overwrite "componentMap" on the <App/> component call.
Fix User's config files description in "src/configs/README.md".
Fix broken links in "/README.md".
Fix the "ReferenceError: Response is not defined" message during the tests by adding the "whatwg-fetch" devDependency.
Fix the test error "Property 'props' is not extensible" by removing "props.appLogo = null" from <LoginPage/>


## 1.0.15 (2024-03-20)
---

### New
Add "react-test-renderer" and test for About and HomePage components.

## Changes
"npm_publish.sh" includes "npm install --package-lock-only"
Add "AI elements" documentation to "src/configs/README.md", to define a ChatBot and ChatBotButton.
"__snapshots__" included in ".gitignore" and ".npmignore".


## Fixes
Fix error in "AppMainComponent" when About pop-up is open and there's a JWT timeout.
Fix "HomePage" component error when a children code is specified.


## 1.0.14 (2024-03-18)
---

### New
Add `make test-run-build` and `make test-run-build-restore` and the `scripts/build_prod_test.sh` bash script to preview the QA/Staging/Prod live environments behavior.
Add the `scripts/npm_publish.sh` bash script, `make pre-publish` and `make publish` to publish library to NPMJS.
Add the `src/configs/README.md` documentation as a complete GenericSuite App creation and configuration guide for all versions.

### Changes
Add the `src/lib/images` directory to the library distribution.
Deployment and local run bash scripts changed to copy all images to the `build/static/media` directory.
Local run bash script creates a symlink in the `dist` directory to the `build/static/media` directory.
"server.js" uses port 3000 instead of 3001.
Use "arrows_rotate_solid.svg" as the Refresh icon in the Generic CRUD editor.
"generic.editor.rfc.ai.button.jsx" moved to genericSuite-fe-ai.
Images exported as image names, not objects.


### Fixes
Fix the images load error in QA/Staging/Prod live environments: "DOMException: Failed to execute 'createElement' on 'Document': The tag name provided ('/static/media/app_logo_square.cd60e8686a973f7c77e9d25313787676.svg') is not a valid name."


## 1.0.12 (2024-03-13)
---

### Fixes
Fix "Uncaught ReferenceError: require is not defined in ./node_modules/genericsuite/dist/esm/index.js" replacing "require('react-bootstrap')" by import ... from 'react-bootstrap/cjs/...".


## 1.0.11 (2024-03-13)
---

### New
Add: library documentation in README.
Add: GenericSuite logo to src/index.jsx

### Changes
Turn off debug on dict-utilities.

### Fixes
Fix error "Can't resolve 'react-bootstrap/NavDropdown' in './genericsuite/dist/esm' Did you mean 'NavDropdown.js'?", as well as the same errors with "Nav" and 'Contyainer.


## 1.0.10 (2024-03-11)
---

### New
Add: debug log for mergeDicts().

### Fixes
"package-lock.json" rebuilt.


## 1.0.9 (2024-03-11)
---

### New
Add mergeDicts() (helpers/dict-utilities.jsx).

### Changes
Parameter "componentMap" of <App /> addsmerges the element list supplied with defaultComponentMap. Previously it replaced defaultComponentMap.

### Fixes
Version sequence in CHANGELOG.


## 1.0.8 (2024-03-11)
---

### Fixes
Fix remove "index" as namespace adding the "output.name" parameter in "rollup.config.mjs".


## 1.0.7 (2024-03-11)
---

### Fixes
Fix "export default {" to be "export {" in "index.cjs".


## 1.0.6 (2024-03-11)
---

### New
Add ".env.example" and "CHANGELOG.md" to package.json included files.
Add jest and <App /> test.
New GenericSuite cirle logo "gs_logo_circle.svg"
Add GenericSuite logo to index.tsx to customize Login.

### Changes
"appLogoPar" parameter renamed to "appLogo" in the LoginPage component.
"appLogo" parameter added to App.jsx, HomePage.jsx and generic.menu.service.jsx.
REACT_APP_GENERIC_SUITE_AI_PATH removed from env.example, webpack.config.js and generic.editor.rfc.ai.button.jsx, and replaced by REACT_APP_GENERIC_SUITE_AI.
"console.error" replaced by "console_debug_log" in db.service.jsx and generic.editor.rfc.ai.button.jsx to avoid test errors.
"<img src="...">" in .svg images changed to "<SVGimage />".
All dependencies moved to devDependencies and peerDependencies to effectively build the library in npmjs.
Module in "tsconfig.json" changed to "ESNext"
"/index.d.ts" removed.
"src/lib/index.js" renamed to "src/lib/index.cjs"
"babel.config.json" renamed to "babel.config.cjs".
"rollup.config.js" renamed to "rollup.config.mjs"

### Fixes
Fix the "RollupError: Could not resolve entry module "dist/esm/index.js"." error changing the following values in "package.json":
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/index.d.ts",


## 1.0.5 (2024-03-09)
---

### New
Include all "src/*" in the package.json.
Add "publish" option to Makefile.
Add Babel build as default build method.
Add "appLogoPar" parameter to LoginPage component to allow the App (project that include genericsuite) to have its own logo to the login page.

### Changes
Rollup build as "build-rollup" in package.json scripts.
Change `input: "./src/index.tsx"` replaced by `input: "./src/lib/index.js"` in rollup.config.js file.

### Fixes
Fix components, images and generic code exports errors during the rollup buid in the "src/lib/index.js" file.
Fix Rollup build errors by adding @rollup/plugin-json, @rollup/plugin-typescript and rollup-plugin-svg-import to devDependencies.
Fix: webpack rutime errors including the file extension .jsx to all code imports.


## 1.0.4 (2024-03-08)
---

### New
Add "build" option to Makefile.

### Changes
Extension changed to .jsx for all .js files.
Change module structure: add "src/lib" directory, remove "_" prefix to "_components", "_constants", "_helpers", "_images", and "_services", move these directories to "src/lib".
All components and generic code exports included in the "src/lib/index.js" file.
Use a direct import from the .json config files instead of require() in getConfigsJsonFile() to allow the App (project that include genericsuite) to handle its own configuration files.

### Breaks
getConfigsJsonFile() removed because require() doesn't allow expresions. E.g. require(jsonFilePath).


## 1.0.3 (2024-03-06)
---

### New
Add "constants-browserify" to webpack resolve fallback.
Add "lock" option to Makefile.

### Changes
Upgraded "fs": "0.0.1-security" to "^0.0.2".
"webpack.config.js" handles "http" conections when REACT_APP_API_URL has "http://".

### Fixes
Fix "webpack reactjs Uncaught ReferenceError: require is not defined" by changing the extension ".js" to ".jsx" in the code files that use require() when the target project use "json-utilities.js" directly or indirectly.
Fix "The request '../constants/general_constants' failed to resolve only because it was resolved as fully specified" in the target project.
Fix "You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file." in "return <componentObj/>;".


## 1.0.2 (2024-03-06)
---

### Fixes
Fix include the "/src" and "/scripts" directories in the npm module.


## 1.0.1 (2024-03-06)
---

### Fixes
Fix .babel, rollup.config.js, tsconfig.json, package.json, and index.tsx to generate the npm module and include the "/dist" files.


## 1.0.0 (2024-03-05)
---

### New
Separate FE Generic Suite to publish on NPM [FA-83].
Initial commit as an independent repository.


## 0.0.18 (2024-02-18)
---

### New
Dynamic centralized parameters (general and user's) [FA-173].
FE-BE: Add preferred language [FA-116].
Create a <CodeBlock> component to interpret ```(Language) ...``` strings [FA-161].
Set a local DNS to allow smartphone to access dev computer with a domain name [FA-163].
Local environment with SSL (webpack/docker) [FA-164].
Add filter feature in Listings [FA-41].
FE: bash script to deploy ReactJs app with AWS Cloudfront and S3 [FA-100].


## 0.0.17 (2023-11-01)

### New
Add SuggestionDropdown component (and autocomplete) as a field type in GCE_RFC [FA-120].
Add `suggestion_dropdown` as type in name field (user_ingredients json definitions) [FA-120].
Add Enable ACLs for the bucket in AWS deploy to S3 [FA-97].
Add `parentUrl` attribute to child_listing/array in json definitions [FA-115].
Add dishes and dish ingredients in json definitions [FA-135].


## 0.0.16 (2023-07-29)

### Fixes
Fix deployment to AWS Cloudfront because npm build does not allow function.name. Funcions names passed to GetFormData() passed as string.
Fix webpack configuration to avoid errors building the prod packages.

### Changes
`change_env_be_endpoint.sh` sets the AWS_S3_BUCKET_NAME in .env file.


## 0.0.15 (2023-07-23)
---

### Changes
Divide the GenericCrudEditor [FA-95].
LoginPage converted to RFC and error "Warning: Cannot update a component" finally removed.
GMB: menu_options getAll() moved from App.jsx to generic.menu.service, and getMenuFromApi created from it.


## 0.0.14 (2023-07-22)
---

### New
Add security for generic editor access, using the BE's /fda_food_query/element endpoint to compare the menu option's element "sec_group" vs user's groups [FA-45].


## 0.0.13 (2023-07-19)
---

### New
Make entries for config and config_qa to prepare the .env file chaging the REACT_APP_API_URL var.
Make entries for deploy and deploy_qa, to deploy to AWS CloudFront/S3.

### Changes
Add "#" in getPrefix when hardPrefix is on, to enable the AWS Cloudfront deployment [FA-97].


## 0.0.12 (2023-07-17)
---

### New
Add `aws_deploy_to_s3.sh` as an alternative to gh-pages [FA-90].


## 0.0.11 (2023-07-15)
---

### New
GMB: introducing the Generic Menu Builder. It reads all the menu Items from the app_main_menu.json and generates the top  and hamburger menus and its component or editor sub-options [FA-10].
GCE_RFC: rowsPerPage can be changed [FA-75].
GSPE: introducing the generic Single Page Editor, to update data pages without the index, like the User Profile.
Read the API "menu_options" endpoint [FA-10].
With the menu_options endpoint, the authorization token can be verified and handle timeouts on the main menu [FA-46].


## 0.0.10 (2023-07-13)
---

### New
GCE_RFC: The react components previously of type object are now of type text in the JSON, therefore the Generic Editor must convert them to object. [FA-86].


## 0.0.9 (2023-07-12)
---

### New
GCE_RFC: editor data definitions are in JSON files from an external git repository [FA-86].


## 0.0.8 (2023-05-27)
---

### New
Add: Specific funcions are now all Promises, so they can access backend API data.


## 0.0.7 (2023-05-26)
---

### New
Add: Password set/change in the User's FormData [FA-36].
Add: UsersDeleteValidations specific function to validate user's FormData fields. Example: superusers and self user cannot be deleted [FA-37].
Add: UsersPasswordValidations, and UsersdbPreWrite specific functions to handle the Password set/change.
Add: General select options TRUE_FALSE and YES_NO, to configure select fields like "superuser".
Add: getUserData() funcion to make possible get user data in validations.
Add: GCE_RFC: "hr" and "label" field types to enhance the DataForm visual design.
Add: GCE_RFC: dbPreValidations specific function to validate resutset data before show the FormData.
Add: GCE_RFC: new "force_value" to assign fixed values to certain fields. Examples: passcode and passcode_repeat, that must be blank always.


## 0.0.6 (2023-05-23)
---

### New
Add: New cache to speed up the Component Select field types, specially in the Listings.
Add: Reload button in the GCE_RFC to refresh the current page and recycle the cache.
Add: Dates standarization between the frontend and backend. In the backend are always timestamps [FA-35].
Add: Basic Yup validations (number, integer, date, datetime, string, email) [FA-37].
Add: New 'datetime-local' data type to input date/time data.
Add: New `default_value: 'current_timestamp'` in the field definitions.

### Breaks
The "generic.editor.service" (Generic CRUD Editor with React Class Components) is not longer used.


## 0.0.5 (2023-05-19)
---

### New
Specific component functions (SCF) to perform a Pre and Post database operations and formData validations:
dbListPreRead, dbListPostRead, dbPreRead, dbPostRead, validations, dbPreWrite, dbPostWrite [FA-37].


## 0.0.4 (2023-05-15)
---

### New
GCE_RFC: Cache for <SELECT></SELECT> data [FA-71].


## 0.0.3 (2023-04-10)
---

### New
New GCE_RFC (Generic CRUD Editor based on React Functional Component) [FA-68].
Paging and navigation in Listing page [FA-39].
Notice when a row has been updated, created or deleted [FA-44].


## 0.0.2 (2022-03-16)
---

### New
Generic CRUD Editor:
Add child listing to the edit screen [FA-33].
Turn generic the select component [FA-61].


## 0.0.1 (2022-03-10)
---

### New
Start programming of the Generic CRUD Editor based on React Class Components.
