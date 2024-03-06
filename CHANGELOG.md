# CHANGELOG

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a Changelog](http://keepachangelog.com/).


## Unreleased
---

### New

### Changes

### Fixes

### Breaks


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
