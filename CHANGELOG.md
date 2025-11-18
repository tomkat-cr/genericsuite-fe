# CHANGELOG

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a Changelog](http://keepachangelog.com/).


## [Unreleased]

### Added

### Changed

### Fixed

### Removed


## [1.1.0] - 2025-11-17

### Added
- Add test cases for redirect functionality in LoginPage component [GS-219].

### Changed
- Update CHANGELOG format to be more semantic [GS-222].

### Fixed
- Fix the merge of "resultset" when following values has same key but empty in the "fieldValues" object (GCE_RFC Specific Functions handling, reduceAllResponses function) [GS-159].
- Replace class-properties plugin with transform-class-properties to fix the "npm warn deprecated @babel/plugin-proposal-class-properties@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-properties instead." warning [GS-219].
- Fix the URL parameter parsing in getUrlParams() to handle the redirect parameter with a hash (#) in the value [GS-219].
- Enhance webpack configuration to conditionally log options and environment variables based on local environment detection.
- Fix: "generic.editor.rfc.specific.func.jsx" to prevent TypeError when merging fieldValues in the "reduceAllResponses" function [GS-230].

### Security
- Update "axios" to ^1.13.0 to fix the security vulnerability [GS-219]:
  - "form-data" CWE-343, CVE-2025-7783, CVSS 9.4.
  - "Axios is vulnerable to DoS attack through lack of data size check"
  - "form-data uses unsafe random function in form-data for choosing boundary"
- Fix "PostCSS line return parsing error" by updating "postcss" to "^8.5.6" [GS-219].
- Fix "Basic rate limiting to mitigate DoS via expensive FS operations" in "server.js" [GS-219].
- Enhance LoginPage redirect handling with URL sanitization [GS-219].
- Update "react-syntax-highlighter" to "^16.1.0" to fix the security vulnerability [GS-219]:
  - "PrismJS DOM Clobbering vulnerability"
- Bump babel-loader to ^10.0.0 to fix "@eslint/plugin-kit is vulnerable to Regular Expression Denial of Service attacks through ConfigCommentParser" [GS-219].
- The following security vulnerabilities were fixed by running "npm audit fix --force" [GS-219]:
  - "Prototype Pollution in JSON5 via Parse Method"
  - "pbkdf2 returns predictable uninitialized/zero-filled memory for non-normalized or unimplemented algos"
  - "pbkdf2 silently disregards Uint8Array input, returning static keys"
  - "Prototype pollution in webpack loader-utils"
  - "sha.js is missing type checks leading to hash rewind and passing on crafted data"


## [1.0.25] - 2025-07-08

### Added
- Implement axios as alternative to fetch [GS-202] [GS-15].
- Add envvar REACT_APP_USE_AXIOS to use axios instead of fetch by default.
- Add Vite as alternative to webpack [GS-195].
- Add: "run_method_dependency_manager.sh" to unify the run method dependency install or uninstall [GS-195].
- Add getAdditionalHeaders() in the dbApiService class to send the 'Access-Control-Expose-Headers': 'Content-Disposition' header and receive file names from the backend [GS-15].
- Add envvar REACT_APP_USE_EXPOSE_HEADERS to add the 'Access-Control-Expose-Headers' header calling the backend (defaults to be off) [GS-15].
- Configure lines per page in the CRUD editor: save and restore it from the LocalStorage. Defaults to 30 (previous was 5) [GS-185].
- Add GCE_RFC configurations to local-config's buildConfigData() [GS-185].
- Add new "getLocalConfigItem" function to local-config to get a configuration item from the local storage config variable [GS-185].
- Add envvar REACT_APP_GCE_ACTIONS_ALLOW_MOUSE_OVER to allow MouseOver in GCE_RFC actions [GS-185].
- Add envvar REACT_APP_GCE_ACTIONS_ALLOW_MAGIC_BUTTON to allow the Magic Button (3-dots) in GCE_RFC actions [GS-185].
- Add getErrorDetail() function to get the error details from the error object [GS-15].
- Add getUuidV4() function to generate a UUID v4 [GS-15].
- Add getContentTypeFromHeadersOrFilename() function to get the content type from the headers or filename [GS-15].
- Add copy_ssl_certs Makefile target to copy the SSL certificates generated in the backend to the frontend [GS-198].
- Add setupTests.js to fix jest test with "react-router-dom" to v7 [GS-199].
- Add setupTests.js and jest.config.cjs to the package.json "files" entry, so they'll be available in node_modules [GS-199].
- Add "@types/node" to resolve paths without error using "@/" prefix [GS-112].
- Implement RUN_PROTOCOL envvar to have the http/https protocol automatically on app local running, no user intervention, as part of the Turborepo initiative [GS-188].
- Add the "TARGET_DIR" (defaults to "public") and "BASE_DIR" (defaults to ".") parameters to the "build_copy_images.sh" script to copy the images to the "public" directory [GS-188].
- Add the "run_method_build.sh" script to run the build process using the specified run method [GS-188].

### Changed
- GCE_RFC and class_name_constants code cleanup.
- convertId() function moved from db.service.jsx to id.utilities.jsx [GS-185].
- fixBlob() receives headers parameter to get the content type from the headers, performs a try-catch to handle errors in URL.createObjectURL(), if the error is 'Overload resolution failed', try it using binaryData.push(blobObj) [GS-15].
- isBinaryFileType() receives additional contentType parameter to get the content type from the headers or filename [GS-15].
- getFilenameFromContentDisposition() verifies if the content disposition header contains a filename with or without quotes [GS-15].
- Install vite, webpack or react-app-rewired dependencies running run_app_frontend.sh according to the RUN_METHOD env var [GS-198].
- Remove vite, webpack and react-app-rewired dependencies running npm_publish.sh [GS-198].
- Implement RUN_METHOD in aws_deploy_to_s3.sh and build_prod_test.sh, so it use vite, webpack or react-app-rewired [GS-199].
- React Router updated from "^v6.18.0" to "^v7.5.3" [GS-199].
- Default node version upgraded to 20 in ".nvmrc" [GS-199].
- Tailwind CSS updated from "^v3.4.9" to "^v4.1.5" [GS-112].
- Add *.ts, *.tsx and ./index.html files to tailwind.config.js [GS-112].
- All debugging flags turned off.

### Fixed
- Fix the net:ERR_CERT_AUTHORITY_INVALID error in GenericSuite FE/BE using the https protocol [GS-198].
- Fix the create_ssl_certs Makefile target to effectively call the backend self-signed SSL certificates creation [GS-198].
- Fix the React Router v7 Future Flag Warning by upgrading "react-router-dom" to v7 [GS-199].
- Fix the "'assert' is deprecated in import statements and support will be removed in a future version; use 'with' instead" running "make publish" and rollup.connfig.mjs.
- Fix Tailwind 4 input and texarea background color issue by adding the gs_core.css to index.html [GS-112].
- Fix prevent object mutation in Object.assign calls by adding empty object as first parameter
- Update "webpack.config.js" to fix the error "Error: Can't resolve 'process/browser'" and remove NODE_TLS_REJECT_UNAUTHORIZED envvar [GS-199] [GS-198] [GS-195].


## [1.0.24] - 2025-02-19

### Added
- Implement API keys to GS BE Core [GS-159].
- Add new features and fix things discovered during the IBM Watson X implementation [GS-155]
- Add the parameter "description_fields" In selectOptions() to have a compound attribute/column name(s) for the drop-down menu descriptions. If not specified, it'll use ["name"] - as it was before) [GS-155].

### Fixed
- Fix the undefined passcode error in user update calling the backend after creating a user leaving the password empty (UsersPasswordValidations) [GS-155].
- Fix a bug calling the specific functions assigning the "fieldValues" object, because genericFuncArrayDefaultValue() was assigning it an infinite recursive "resultset" attribute, preventing the default values assignment in "dbPreRead" call (creation).


## [1.0.23] - 2024-10-25

### Added
- Add "closeHandler" parameter to errorAndReEnter().

### Fixed
- Fix markdown formatting in AI Assistant conversation [GS-145].
- Fix copy button in non-secure http connection [GS-144].


## [1.0.22] - 2024-10-07

### Added
- Add Darkmode [GS-63].
- Add Configurable sidebar menu [GS-114].
- Add localstorage generic functions [GS-112].
- Add Save darkmode and side menu set to localstorage [GS-112].
- New "GsIcons" library replaces FontAwesome [GS-115].
- Add landscape logo to the App header (appLogoHeader) [GS-63].
- Add the optional "template" attribute to app_main_menu.json entries to customize the menu option design [GS-112] [GS-129].
- Add the <NoDesignComponent>> to have menu options with no GS FE Core design [GS-112] [GS-129].
- Add testHelpersMocks export [GS-129].

### Changed
- Replace react-bootstrap entirely and use only Tailwind CSS [GS-63].
- Delete local storage PII [GS-2]
- Change the behavior of actions so that they appear when clicking on the line in the GCE_RFC (generic CRUD editor) listing page [GS-112].
- Change the color when hovering over the line in the GCE_RFC listing page [GS-112].
- Change lines with different colors if they are even/odd in the GCE_RFC listing page [GS-112].
- Improve data page layout by implementing Tailwind constants in the GCE_RFC [GS-112].
- Change Search input box size too small in the GCE_RFC listing page [GS-112].
- <HashRouter> was replaced by <RouterProvider> and createBrowserRouter() [GS-112].
- "/login" replaced by "/logout" in the Log Out option [GS-112].
- Add "openai_api_key" and "openai_model" fields  to user and user_profile json default configs [FA-200] [FA-201].
- <PrivateRoute/> avoid use getPrefix(true) [GS-112].
- Rename "test-helpers/mock-fetch.ts" to "test-helpers/mocks.js" to make it more generic and change the ".ts" extension by ".js" to fix the "Parameter 'data' implicitly has an 'any' type | export function mockFetch(data)..." error during the "make publish" [GS-129].

### Fixed
- Fix missing classes in the new output.css of Tailwind v3.4.9 [GS-63].
- Fix the row values in index page not shown issue [GS-108].
- Fix the %PUBLIC_URL% issue in public/index.html file running the app with webpack [GS-116].
- Fix show WaitAnimation() in iterateChildComponents() and EditFormFormik() to make the data loading evident in the User Profile menu option [GS-112].
- Formik version fixed to 2.4.5 in package.json to avoid GCE_RFC warning when the +New button is clicked [GS-25] [GS-112].

### Removed
- Bootstrap CSS is not longer used [GS-63].
- FontAwesome is not longer used [GS-115].
- SVG images removed and included in the "GsIcons" library [GS-115].
- Get rid of eval() in the GS FrontEnd [GS-127].


## [1.0.21] - 2024-07-27

### Added
- Add ".nvmrc" file to set the repo default node version.

### Changed
- Update dependency versions (@testing-library/react: ^14.2.1 -> ^15.0.7).

### Fixed
- Fix audio processing issues in FastAPI Apps [GS-95].
- Fix error "Failed to execute 'atob' on 'Window': The string to be decoded contains characters outside of the Latin1" [GS-95].
- Fix '[object Object]' in getErrorMessage() 'reason' [GS-70].
- Fix "ReferenceError: fetch is not defined" error in npm test.
- Fix "ReferenceError: Response is not defined" error in npm test.
- Fix "Warning: ReactDOMTestUtils.act is deprecated in favor of React.act" in npm test.
- Fix "TypeError: (0 , _authenticationService.getUserData) is not a function" error in npm test.


## [1.0.20] - 2024-05-17

### Added
- Add AWS_SSL_CERTIFICATE_ARN env. var. for those cases where the SSL certificate cannot be found automatically in AWS certificate manager [FA-98].

### Changed
- Change "npm_publish.sh" to show the current date/time at the end [FA-83].
- Change: remove <a /> from "ACCOUNT_INACTIVE" in "app_constants.json".
- Redirect README instructions to the GenericSuite Documentation [GS-73].

### Fixed
- Fix the "ACM certificate ARN not found" error in "aws_deploy_to_s3.sh" and "aws_get_ssl_cert_arn.sh" by using AWS_SSL_CERTIFICATE_ARN env. var. [FA-98].
- Fix "error-and-reenter.jsx" to log error in the JS console instead of showing "[object Object]" in the pop-up when "getErrorMessage" calls "extractErrorFromVariants" [FA-246].


## [1.0.19] - 2024-04-20

### Added
- Add FastAPI enhanced support [FA-246].

### Changed
- ".env.example" GIT_SUBMODULE_URL and AWS_S3_BUCKET_NAME_* variables with more descriptive values.
- Customized "index.html" instructions to fix the frontend design when the project is created.
- Add more instructions to project creation process in the "src/configs/README".
- Change: README with main image from the official documentation site and .png version removed [FA-246].
- Change: Homepage pointed to "https://genericsuite.carlosjramirez.com/Frontend-Development/GenericSuite-Core/" [FA-257].

### Fixed
- Fix "Converting circular structure to JSON" error saving Child (array) sets with a "resultset" element in the "_old" value causing an infinite loop.


## [1.0.18] - 2024-04-06

### Fixed
- Fix the labels color for required fields in the "generic.editor.rfc.formpage.jsx" data form.
- Fix users and user_profile save error "Connection failure (Possible CORS): Failed to fetch [EFFF-010]" by removing "UsersDbPostWrite".

### Changed
- Change "convertHeight" and "convertWeight" to validate parameters and avoid throwing an error the they are empty during the generic editor Create action.
- Change "EditFormFormikFinal" to add the new Item created "id" to submitedtElements (data passed to processGenericFuncArray) before calling DbPostWrite.


## [1.0.17] - 2024-04-01

### Added
- Add `make deploy_demo` and `make config_demo` to manage the "demo" stage.
- Add "demo" stage to REACT_APP_API_URL, and AWS_S3_BUCKET_NAME.
- Add APP_FE_URL_DEV, APP_FE_URL_QA, APP_FE_URL_STAGING, APP_FE_URL_PROD, APP_FE_URL_DEMO variables to .env file, to be used by "aws_deploy_to_s3.sh" and "change_env_be_endpoint.sh" as the frontend domain.
- Add the FRONTEND_LOCAL_PORT and BACKEND_LOCAL_PORT variables to .env file, to define the local frontend and backend port numbers.
- Add "scripts/aws_get_ssl_cert_arn.sh" to verify the AWS ACM Certificate ARNs for the frontend and backend domains.

### Fixed
- Fix "add_github_submodules.sh" to do "git submodule init", "git submodule sync" and "git pull --tags origin main" instead of "git checkout origin/main" to effectively pull the JSON configs from the git repository when the directory specified in "GIT_SUBMODULE_LOCAL_PATH" already exists and "git submodule add" was already run.

### Changed
- The REACT_APP_API_URL_DEV, REACT_APP_API_URL_QA, REACT_APP_API_URL_STAGING, REACT_APP_API_URL_PROD, and REACT_APP_API_URL_DEMO variable names in the .env file were renamed to APP_API_URL_DEV, APP_API_URL_QA, APP_API_URL_STAGING, APP_API_URL_PROD, and APP_API_URL_DEMO.
- The GITHUB_USERNAME and GITHUB_REPONAME variables are not longer required because "aws_deploy_to_s3.sh" just saves the existing value of "homepage" in package.json. Those 2 variables were removed from the .env file.
- "aws_deploy_to_s3.sh" take into account the APP_FE_URL domain in the CloudFront distribution creation.
- "make publish" report the package name and version in the publishing confirmation.
- "run_app_frontend.sh" assign APP_API_URL_DEV and REACT_APP_API_URL in the "dev" stage for both http and https modes. Previously it was only made for http.
- Node install links changed to include the NVM alternative download in the README.
- License changed to ISC [FA-244].


## [1.0.16] - 2024-03-21

### Added
- Add AboutBodyGsFe and HomePageGsFe components to customize genericsuite-fe test run with "index.tsx".
- Add test for LoginPage, GeneralConfig, Users, UserProfile, UsersConfig, AboutBodyGsFe and HomePageGsFe components.

### Changed
- REACT_APP_GENERIC_SUITE_AI environment variable removed from webpack.config.js and .env.example.
- "generic.editor.rfc.ai.button.jsx" removed. Its code was moved to genericSuite-fe-ai.
- Debug turned off on <App/>, <SearchEngineButton/> and handleFetchError().

### Fixed
- **Fix "dictToAdd" precedence over "originDict" in mergeDicts()** to allow the referring App to overwrite "componentMap" on the <App/> component call.
- Fix User's config files description in "src/configs/README.md".
- Fix broken links in "/README.md".
- Fix the "ReferenceError: Response is not defined" message during the tests by adding the "whatwg-fetch" devDependency.
- Fix the test error "Property 'props' is not extensible" by removing "props.appLogo = null" from <LoginPage/>


## [1.0.15] - 2024-03-20

### Added
- Add "react-test-renderer" and test for About and HomePage components.

### Changed
- "npm_publish.sh" includes "npm install --package-lock-only"
- Add "AI elements" documentation to "src/configs/README.md", to define a ChatBot and ChatBotButton.
- "__snapshots__" included in ".gitignore" and ".npmignore".


### Fixed
- Fix error in "AppMainComponent" when About pop-up is open and there's a JWT timeout.
- Fix "HomePage" component error when a children code is specified.


## [1.0.14] - 2024-03-18

### Added
- Add `make test-run-build` and `make test-run-build-restore` and the `scripts/build_prod_test.sh` bash script to preview the QA/Staging/Prod live environments behavior.
- Add the `scripts/npm_publish.sh` bash script, `make pre-publish` and `make publish` to publish library to NPMJS.
- Add the `src/configs/README.md` documentation as a complete GenericSuite App creation and configuration guide for all versions.

### Changed
- Add the `src/lib/images` directory to the library distribution.
- Deployment and local run bash scripts changed to copy all images to the `build/static/media` directory.
- Local run bash script creates a symlink in the `dist` directory to the `build/static/media` directory.
- "server.js" uses port 3000 instead of 3001.
- Use "arrows_rotate_solid.svg" as the Refresh icon in the Generic CRUD editor.
- "generic.editor.rfc.ai.button.jsx" moved to genericSuite-fe-ai.
- Images exported as image names, not objects.

### Fixed
- Fix the images load error in QA/Staging/Prod live environments: "DOMException: Failed to execute 'createElement' on 'Document': The tag name provided ('/static/media/app_logo_square.cd60e8686a973f7c77e9d25313787676.svg') is not a valid name."


## [1.0.12] - 2024-03-13

### Fixed
- Fix "Uncaught ReferenceError: require is not defined in ./node_modules/genericsuite/dist/esm/index.js" replacing "require('react-bootstrap')" by import ... from 'react-bootstrap/cjs/...".


## [1.0.11] - 2024-03-13

### Added
- Add: library documentation in README.
- Add: GenericSuite logo to src/index.jsx

### Changed
- Turn off debug on dict-utilities.

### Fixed
- Fix error "Can't resolve 'react-bootstrap/NavDropdown' in './genericsuite/dist/esm' Did you mean 'NavDropdown.js'?", as well as the same errors with "Nav" and 'Contyainer.


## [1.0.10] - 2024-03-11

### Added
- Add: debug log for mergeDicts().

### Fixed
- "package-lock.json" rebuilt.


## [1.0.9] - 2024-03-11

### Added
- Add mergeDicts() (helpers/dict-utilities.jsx).

### Changed
- Parameter "componentMap" of <App /> addsmerges the element list supplied with defaultComponentMap. Previously it replaced defaultComponentMap.

### Fixed
- Version sequence in CHANGELOG.


## [1.0.8] - 2024-03-11

### Fixed
- Fix remove "index" as namespace adding the "output.name" parameter in "rollup.config.mjs".


## [1.0.7] - 2024-03-11

### Fixed
- Fix "export default {" to be "export {" in "index.cjs".


## [1.0.6] - 2024-03-11

### Added
- Add ".env.example" and "CHANGELOG.md" to package.json included files.
- Add jest and <App /> test.
- New GenericSuite cirle logo "gs_logo_circle.svg"
- Add GenericSuite logo to index.tsx to customize Login.

### Changed
- "appLogoPar" parameter renamed to "appLogo" in the LoginPage component.
- "appLogo" parameter added to App.jsx, HomePage.jsx and generic.menu.service.jsx.
- REACT_APP_GENERIC_SUITE_AI_PATH removed from env.example, webpack.config.js and generic.editor.rfc.ai.button.jsx, and replaced by REACT_APP_GENERIC_SUITE_AI.
- "console.error" replaced by "console_debug_log" in db.service.jsx and generic.editor.rfc.ai.button.jsx to avoid test errors.
- "<img src="...">" in .svg images changed to "<SVGimage />".
- All dependencies moved to devDependencies and peerDependencies to effectively build the library in npmjs.
- Module in "tsconfig.json" changed to "ESNext"
- "/index.d.ts" removed.
- "src/lib/index.js" renamed to "src/lib/index.cjs"
- "babel.config.json" renamed to "babel.config.cjs".
- "rollup.config.js" renamed to "rollup.config.mjs"

### Fixed
- Fix the "RollupError: Could not resolve entry module "dist/esm/index.js"." error changing the following values in "package.json":
  - "main": "dist/cjs/index.js",
  - "module": "dist/esm/index.js",
  - "types": "dist/index.d.ts",


## [1.0.5] - 2024-03-09

### Added
- Include all "src/*" in the package.json.
- Add "publish" option to Makefile.
- Add Babel build as default build method.
- Add "appLogoPar" parameter to LoginPage component to allow the App (project that include genericsuite) to have its own logo to the login page.

### Changed
- Rollup build as "build-rollup" in package.json scripts.
- Change `input: "./src/index.tsx"` replaced by `input: "./src/lib/index.js"` in rollup.config.js file.

### Fixed
- Fix components, images and generic code exports errors during the rollup buid in the "src/lib/index.js" file.
- Fix Rollup build errors by adding @rollup/plugin-json, @rollup/plugin-typescript and rollup-plugin-svg-import to devDependencies.
- Fix: webpack rutime errors including the file extension .jsx to all code imports.


## [1.0.4] - 2024-03-08

### Added
- Add "build" option to Makefile.

### Changed
- Extension changed to .jsx for all .js files.
- Change module structure: add "src/lib" directory, remove "_" prefix to "_components", "_constants", "_helpers", "_images", and "_services", move these directories to "src/lib".
- All components and generic code exports included in the "src/lib/index.js" file.
- Use a direct import from the .json config files instead of require() in getConfigsJsonFile() to allow the App (project that include genericsuite) to handle its own configuration files.

### Removed
- getConfigsJsonFile() removed because require() doesn't allow expresions. E.g. require(jsonFilePath).


## [1.0.3] - 2024-03-06

### Added
- Add "constants-browserify" to webpack resolve fallback.
- Add "lock" option to Makefile.

### Changed
- Upgraded "fs": "0.0.1-security" to "^0.0.2".
- "webpack.config.js" handles "http" conections when REACT_APP_API_URL has "http://".

### Fixed
- Fix "webpack reactjs Uncaught ReferenceError: require is not defined" by changing the extension ".js" to ".jsx" in the code files that use require() when the target project use "json-utilities.js" directly or indirectly.
- Fix "The request '../constants/general_constants' failed to resolve only because it was resolved as fully specified" in the target project.
- Fix "You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file." in "return <componentObj/>;".


## [1.0.2] - 2024-03-06

### Fixed
- Fix include the "/src" and "/scripts" directories in the npm module.


## [1.0.1] - 2024-03-06

### Fixed
- Fix .babel, rollup.config.js, tsconfig.json, package.json, and index.tsx to generate the npm module and include the "/dist" files.


## [1.0.0] - 2024-03-05

### Added
- Separate FE Generic Suite to publish on NPM [FA-83].
- Initial commit as an independent repository.


## [0.0.18] - 2024-02-18

### Added
- Dynamic centralized parameters (general and user's) [FA-173].
- FE-BE: Add preferred language [FA-116].
- Create a <CodeBlock> component to interpret ```(Language) ...``` strings [FA-161].
- Set a local DNS to allow smartphone to access dev computer with a domain name [FA-163].
- Local environment with SSL (webpack/docker) [FA-164].
- Add filter feature in Listings [FA-41].
- FE: bash script to deploy ReactJs app with AWS Cloudfront and S3 [FA-100].


## [0.0.17] - 2023-11-01

### Added
- Add SuggestionDropdown component (and autocomplete) as a field type in GCE_RFC [FA-120].
- Add `suggestion_dropdown` as type in name field (user_ingredients json definitions) [FA-120].
- Add Enable ACLs for the bucket in AWS deploy to S3 [FA-97].
- Add `parentUrl` attribute to child_listing/array in json definitions [FA-115].
- Add dishes and dish ingredients in json definitions [FA-135].


## [0.0.16] - 2023-07-29

### Fixed
- Fix deployment to AWS Cloudfront because npm build does not allow function.name. Funcions names passed to GetFormData() passed as string.
- Fix webpack configuration to avoid errors building the prod packages.

### Changed
- `change_env_be_endpoint.sh` sets the AWS_S3_BUCKET_NAME in .env file.


## [0.0.15] - 2023-07-23

### Changed
- Divide the GenericCrudEditor [FA-95].
- LoginPage converted to RFC and error "Warning: Cannot update a component" finally removed.
- GMB: menu_options getAll() moved from App.jsx to generic.menu.service, and getMenuFromApi created from it.


## [0.0.14] - 2023-07-22

### Added
- Add security for generic editor access, using the BE's /fda_food_query/element endpoint to compare the menu option's element "sec_group" vs user's groups [FA-45].


## [0.0.13] - 2023-07-19

### Added
- Make entries for config and config_qa to prepare the .env file chaging the REACT_APP_API_URL var.
- Make entries for deploy and deploy_qa, to deploy to AWS CloudFront/S3.

### Changed
- Add "#" in getPrefix when hardPrefix is on, to enable the AWS Cloudfront deployment [FA-97].


## [0.0.12] - 2023-07-17

### Added
- Add `aws_deploy_to_s3.sh` as an alternative to gh-pages [FA-90].


## [0.0.11] - 2023-07-15

### Added
- GMB: introducing the Generic Menu Builder. It reads all the menu Items from the app_main_menu.json and generates the top  and hamburger menus and its component or editor sub-options [FA-10].
- GCE_RFC: rowsPerPage can be changed [FA-75].
- GSPE: introducing the generic Single Page Editor, to update data pages without the index, like the User Profile.
- Read the API "menu_options" endpoint [FA-10].
- With the menu_options endpoint, the authorization token can be verified and handle timeouts on the main menu [FA-46].


## [0.0.10] - 2023-07-13

### Added
- GCE_RFC: The react components previously of type object are now of type text in the JSON, therefore the Generic Editor must convert them to object. [FA-86].


## [0.0.9] - 2023-07-12

### Added
- GCE_RFC: editor data definitions are in JSON files from an external git repository [FA-86].


## [0.0.8] - 2023-05-27

### Added
- Add: Specific funcions are now all Promises, so they can access backend API data.


## [0.0.7] - 2023-05-26

### Added
- Add: Password set/change in the User's FormData [FA-36].
- Add: UsersDeleteValidations specific function to validate user's FormData fields. Example: superusers and self user cannot be deleted [FA-37].
- Add: UsersPasswordValidations, and UsersdbPreWrite specific functions to handle the Password set/change.
- Add: General select options TRUE_FALSE and YES_NO, to configure select fields like "superuser".
- Add: getUserData() funcion to make possible get user data in validations.
- Add: GCE_RFC: "hr" and "label" field types to enhance the DataForm visual design.
- Add: GCE_RFC: dbPreValidations specific function to validate resutset data before show the FormData.
- Add: GCE_RFC: new "force_value" to assign fixed values to certain fields. Examples: passcode and passcode_repeat, that must be blank always.


## [0.0.6] - 2023-05-23

### Added
- Add: New cache to speed up the Component Select field types, specially in the Listings.
- Add: Reload button in the GCE_RFC to refresh the current page and recycle the cache.
- Add: Dates standarization between the frontend and backend. In the backend are always timestamps [FA-35].
- Add: Basic Yup validations (number, integer, date, datetime, string, email) [FA-37].
- Add: New 'datetime-local' data type to input date/time data.
- Add: New `default_value: 'current_timestamp'` in the field definitions.

### Removed
- The "generic.editor.service" (Generic CRUD Editor with React Class Components) is not longer used.


## [0.0.5] - 2023-05-19

### Added
- Specific component functions (SCF) to perform a Pre and Post database operations and formData validations:
- dbListPreRead, dbListPostRead, dbPreRead, dbPostRead, validations, dbPreWrite, dbPostWrite [FA-37].


## [0.0.4] - 2023-05-15

### Added
- GCE_RFC: Cache for <SELECT></SELECT> data [FA-71].


## [0.0.3] - 2023-04-10

### Added
- New GCE_RFC (Generic CRUD Editor based on React Functional Component) [FA-68].
- Paging and navigation in Listing page [FA-39].
- Notice when a row has been updated, created or deleted [FA-44].


## [0.0.2] - 2022-03-16

### Added
- Generic CRUD Editor:
  - Add child listing to the edit screen [FA-33].
  - Turn generic the select component [FA-61].


## [0.0.1] - 2022-03-10

### Added
- Start Generic CRUD Editor based on React Class Components development.
