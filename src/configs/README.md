# GenericSuite App Creation and Configuration

In this documentation we'll show how to create the App frontend/backend configurations and data structures.

# Creating the App

Every App should have a frontend and a backend parts.<br/>

The frontend is the element the user interacts with, the visible part. Can be a website made with RactJS or a mobile App made by Flutter or React Native.<br/>

The backend is the API interacts with the Database and other elements invisible for the use. Can be made in Python or GoLang.<br/>

In the GenericSuite context there's a third element, the "Configuration directory".

## Configuration directory

Here's where the App configuration lives. The suggested structure is:

```
src/configs
├── CHANGELOG.md
├── README.md
├── backend
│   ├── app_main_menu.json
│   ├── endpoints.json
│   ├── general_config.json
│   ├── users.json
│   └── users_config.json
└── frontend
    ├── app_constants.json
    ├── class_name_constants.js
    ├── general_config.json
    ├── general_constants.json
    ├── users.json
    ├── users_config.json
    └── users_profile.json
```

## Frontend directory

Configurations used by both the frontend App and the backend API.

### app_constants.json

App general constants.
These constants should be copied to the target App directory to change the specific values for e.g. `BILLING_PLANS`, email address in `ERROR_MESSAGES`, `APP_EMAILS` and `APP_VALID_URLS` (check `includesAppValidLinks()` and `dangerouslySetInnerHTML`).

### class_name_constants.js

App class names and definitions, for CSS design.

### general_constants.json

App general constants, mostly for `<select/>` pull downs. E.g. `TRUE_FALSE`, `YES_NO`, `LANGUAGES`.

### general_config.json

App general Configuration Parameters editor definitions.
All the parameters in the backend Config() class that can be read from environment variables can be dynamically overwritten by the Configuration Parameters.
This is used for the frontend `Admin > Configuration Parameters` menu option.

### users.json

Users' specific configuration parameters editor definitions.
This is used for the frontend `Admin > Users` menu option.

### users_config.json

Users' specific configuration parameters editor definitions.
This is used for the `Configuration parameters` in frontend's `Admin > Users` menu option.

### users_profile.json

Users' profile configuration.
This is used for the frontend `Hamburger Menu > Profile` menu option.

## Backend directory

Configurations only visible in the backend API.
This is mostly for options the menu structure and security that we don't want to be available in the frontend.

### app_main_menu.json

Menu structure and security configurations.

### endpoints.json

Endpoints definition and configuration.

### general_config.json

App general Configuration Parameters editor definitions.

### users.json

Users editor definitions.

### users_config.json

Users' specific configuration parameters editor definitions.
These configuration parameters overwrite the general Configuration Parameters, by user.

## Share JSON files between the development repositories

To share the JSON files between the frontend and backend development repositories, a separate repository can be created and linked to both repos with a Git Sub-Module:

1. Create the repository for only the JSON files.

2. Create this directory structure:
```
.
├── CHANGELOG.md
├── README.md
├── backend
└── frontend
```

3. Define the `GIT_SUBMODULE_LOCAL_PATH` and `GIT_SUBMODULE_URL` parametes in the frontend [.env](https://github.com/tomkat-cr/genericsuite-fe/blob/main/.env.example) file.

4. Define the `GIT_SUBMODULE_LOCAL_PATH` and `GIT_SUBMODULE_URL` parametes in the backend [.env](https://github.com/tomkat-cr/genericsuite-be/blob/main/.env.example) file.

5. In both frontend and backend repositories run:

```bash
make add_submodules
```


## App frontend

Follow the instructions to create the App's frontend in ReactJS [here](https://github.com/tomkat-cr/genericsuite-fe/blob/main/README.md).<br/>
If the App will include AI features, click [here](https://github.com/tomkat-cr/genericsuite-fe-ai/blob/main/README.md).<br/>

### Create the starting code

In the `src` directory:

- `index.jsx` ([example](https://github.com/tomkat-cr/genericsuite-fe-ai/blob/main/src/index.jsx))<br/>
App starting point.
```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from './components/App/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <App/>
    </HashRouter>
  </React.StrictMode>
);
```

- `index.css` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/index.css))<br/>
General CSS and Tailwind configuration.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- `d.ts` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/d.ts))<br/>
To allow the JSON files import.

```ts
declare module "*.json"
```

### Create initial components

- Create the `src/components` directory.

- Create the `src/components/About`, `src/components/App`, `src/components/HomePage` directories:

- `About/About.jsx` component.

   In the About pop-up will be your App description :
```js
import React from 'react'
import * as gs from "genericsuite";
const GsAboutBody = gs.AboutBody;
export const AboutBody = () => {
    return (
        <GsAboutBody>
            <p>
                ExampeApp is an application to ...
            </p>
        </GsAboutBody>
    )
}
```

- `App/App.jsx` component ([example](https://github.com/tomkat-cr/genericsuite-fe-ai/blob/main/src/lib/components/App/App.jsx))<br/>

   Configure the App logo (e.g. `app_logo_circle.svg`) and the main menu components (e.g. `ExampleMainElement` and `ExampleChildElement`).
```js
import React from 'react';
import * as gs from "genericsuite";
import { ExampleMainElement } from '../ExampleMenu/ExampleMainElement.jsx';
import { ExampleChildElement } from '../ExampleMenu/ExampleChildElement.jsx';

const componentMap = {
    "ExampleMainElement": ExampleMainElement,
    "ExampleChildElement": ExampleChildElement,
};

export const App = () => {
    return (
        <gs.App
            appLogo="app_logo_circle.svg"
            componentMap={componentMap}
        />
    );
}
```

- `HomePage/HomePage.jsx` component.

   Define the Home Page content.
```js
import React, { useState, useEffect } from 'react';
import * as gs from "genericsuite";
const authenticationService = gs.authenticationService.authenticationService;
export const HomePage = () => {
    // Get the current logged user data
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
    useEffect(() => {
        const subscription = authenticationService.currentUser.subscribe(
            x => setCurrentUser(x)
        );
        return () => subscription.unsubscribe();
    }, []);
    return (
        <gs.HomePage>
            <h1>Hi {currentUser.firstName}!</h1>
            <OtherComponents ... />
        </gs.HomePage>
    );
}
```

### Define specific App constants

- `src/configs/frontend/app_constants.json` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/configs/frontend/app_constants.json))

```json
{
    "BILLING_PLANS": {
        "free": "Free",
        "basic": "Basic",
        "premium": "Premium"
    },
    "GENDERS": {
        "m": "Male",
        "f": "Female",
        "nb": "Non-binary",
        "o": "Other"
    },
    "ERROR_MESSAGES": {
        "ACCOUNT_INACTIVE": "User account inactive [L5]. To activate your account, please contact <a href=\"mailto:support@exampleapp.com\">support@exampleapp.com</a></div>"
    },
    "APP_EMAILS": {
        "SUPPORT_EMAIL": "support@exampleapp.com",
        "INFO_EMAIL": "info@exampleapp.com"
    },
    "APP_VALID_URLS": {
        "APP_DOMAIN": "exampleapp.com",
        "APP_WEBSITE": "https://www.exampleapp.com"
    }
}
```
NOTE: replace `exampleapp.com`, `info@exampleapp.com` and `support@exampleapp.com` with your App domains and emails.

- `src/_constants/app_constants.jsx` ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/lib/constants/app_constants.jsx))

```js
import constants from "../configs/frontend/app_constants.json";
import * as gs from "genericsuite";

const buildConstant = gs.jsonUtilities.buildConstant;

export const GENDERS = buildConstant(constants.GENDERS);
export const BILLING_PLANS = buildConstant(constants.BILLING_PLANS);
export const ERROR_MESSAGES = constants.ERROR_MESSAGES;
export const APP_EMAILS = constants.APP_EMAILS;
export const APP_VALID_URLS = constants.APP_VALID_URLS;
```

### Define CRUD editors

Now we are going the define two components: `ExampleMainElement` which is the main component accesible from the main menu and will allow to perform the CRUD operations (create,read, update, delete) over an `example_table`.

The `ExampleMainElement` will have a child componen `ExampleChildElement` with a `1-to-many` relationship and it will be stored in the same `example_table` as an array element.

- Create these directories:
```
src/components/ExampleMenu
src/images
src/configs
src/configs/backend
src/configs/frontend
```

- In the `src/components/ExampleMenu` directory, create these files:
```
src/components/ExampleMenu/ExampleMainElement.jsx
src/components/ExampleMenu/ExampleChildElement.jsx
```

- In the `src/configs` directory, create these files:
```
src/configs/backend/example_main_element.json
src/configs/backend/example_child_element.json
src/configs/frontend/example_main_element.json
src/configs/frontend/example_child_element.json
```

You will have a directory/files structure like this:
```
.
└── src
    ├── components
    │   ├── ExampleMenu
    │   │   ├── ExampleMainElement.jsx
    │   │   └── ExampleChildElement.jsx
    ├── configs
    │   ├── backend
    │   │   ├── example_main_element.json
    │   │   └── example_child_element.json
    │   └── frontend
    │       ├── example_main_element.json
    │       └── example_child_element.json
    └── images
        └── app_logo_circle.svg
```

- `src/components/ExampleMenu/ExampleMainElement.jsx` file:<br/>
Will have the main component that allows CRUD operations over the `example_table`.<br/>
```js
import React from 'react';

import * as gs from "genericsuite";
import exampleMainElementConfig from "../../configs/frontend/example_main_element.json";
import {
    GENDERS,
    BILLING_PLANS
} from '../../constants/app_constants.jsx';

import {
    ExampleChildElement,
} from './ExampleChildElement.jsx';

const GenericCrudEditor = gs.genericEditorRfcService.GenericCrudEditor;
const GetFormData = gs.genericEditorRfcService.GetFormData;

// To show debug data in the Browser's developer tools console
const console_debug_log = gs.loggingService.console_debug_log;

export function ExampleMainElement_EditorData() {
    console_debug_log("ExampleMainElement_EditorData");
    const registry = {
        "ExampleMainElement": ExampleMainElement, 
        "ExampleChildElement": ExampleChildElement,
        "GENDERS": GENDERS,
        "BILLING_PLANS": BILLING_PLANS,
    }
    return GetFormData(exampleMainElementConfig, registry, 'ExampleMainElement_EditorData');
}

export const ExampleMainElement = () => (
    <GenericCrudEditor editorConfig={ExampleMainElement_EditorData()} />
)
```

- `src/configs/frontend/example_main_element.json` file:<br/>
Will have the main component configuration for both backend and frontend.<br/>
```json
{
    "baseUrl": "example_table",
    "title": "Example Main Element",
    "name": "Dish",
    "component": "ExampleMainElement",
    "dbApiUrl": "example_table_endpoint",
    "mandatoryFilters": {
        "user_id": "{CurrentUserId}",
        "type": "D"
    },
    "fieldElements": [
        {
            "name": "id",
            "required": true,
            "label": "ID",
            "type": "_id",
            "readonly": true,
            "hidden": true
        },
        {
            "name": "user_id",
            "required": true,
            "label": "User ID",
            "type": "text",
            "readonly": true,
            "hidden": true
        },
        {
            "name": "gender",
            "required": true,
            "label": "Gender",
            "type": "select",
            "select_elements": "GENDERS",
            "readonly": true,
            "hidden": false,
            "default_value": "m"
        },
        {
            "name": "name",
            "required": true,
            "label": "Name",
            "type": "text",
            "readonly": false,
            "listing": true
        },
        {
            "name": "billing_plan",
            "required": true,
            "label": "Billing Plan",
            "type": "select",
            "select_elements": "BILLING_PLANS",
            "readonly": false,
            "listing": true,
            "default_value": "free"
        },
        {
            "name": "creation_date",
            "required": true,
            "label": "Created",
            "type": "datetime-local",
            "readonly": true,
            "hidden": false,
            "default_value": "current_timestamp",
            "listing": true
        },
        {
            "name": "update_date",
            "required": true,
            "label": "Last update",
            "type": "datetime-local",
            "readonly": true,
            "hidden": false,
            "default_value": "current_timestamp",
            "listing": false
        }
    ],
    "childComponents": [
        "ExampleChildElement"
    ]
}
```

- `src/configs/backend/example_main_element.json` file:<br/>
Will have the main component backend configuration.<br/>
`creation_pk_name` define the attribute name used to verify duplicates in creation. In this case, it won't allow repeated `name`.<br/>
`additional_query_params` allows to have a secondary key queries.<br/><br/>
```json
{
    "table_name": "example_table",
    "notes": "Example table main table",
    "creation_pk_name": "name",
    "additional_query_params": [
        "name"
    ]
}
```

- `src/components/ExampleMenu/ExampleChildElement.jsx` file:<br/>
Will have the child component that allows CRUD operations over the `child_array` attribute in the `example_table`.<br/>
```js
import React from 'react';

import * as gs from "genericsuite";
import exampleChildElementConfig from "../../configs/frontend/example_child_element.json";

const TRUE_FALSE = gs.generalConstants.TRUE_FALSE;

const GenericCrudEditor = gs.genericEditorRfcService.GenericCrudEditor;
const GetFormData = gs.genericEditorRfcService.GetFormData;

export function ExampleChildElement_EditorData() {
    const registry = {
        "ExampleChildElement": ExampleChildElement, 
        "TRUE_FALSE": TRUE_FALSE,
    }
    return GetFormData(exampleChildElementConfig, registry, false);
}

export const ExampleChildElement = ({parentData, handleFormPageActions}) => (
    <GenericCrudEditor
        editorConfig={ExampleChildElement_EditorData()}
        parentData={parentData}
        handleFormPageActions={handleFormPageActions}
    />
)
```

- `src/configs/frontend/example_child_element.json` file:<br/>
Will have the child component configuration for both backend and frontend.<br/>
```json
{
    "baseUrl": "example_table_child",
    "title": "Example Child Elements",
    "name": "Example Child Element",
    "dbApiUrl": "example_table_child_endpoint",
    "component": "ExampleChildElement",
    "type": "child_listing",
    "subType": "array",
    "array_name": "child_array",
    "parentUrl": "example_table",
    "parentKeyNames": [
        {
            "parameterName": "child_id",
            "parentElementName": "id"
        }
    ],
    "primaryKeyName": "id",
    "allow_duplicates": true,
    "fieldElements": [
        {
            "name": "id",
            "required": false,
            "label": "ID",
            "type": "text",
            "readonly": true,
            "hidden": true,
            "listing": false,
            "uuid_generator": true
        },
        {
            "name": "float_value",
            "required": true,
            "label": "Float Value",
            "type": "number",
            "readonly": false,
            "listing": true
        },
        {
            "name": "yes_no",
            "required": true,
            "label": "Yes or No",
            "type": "select",
            "select_elements": "TRUE_FALSE",
            "readonly": false,
            "listing": true,
            "default_value": "1"
        },
        {
            "name": "quantity",
            "required": true,
            "label": "Qty.",
            "type": "number",
            "min": "0",
            "max": "9999",
            "readonly": false,
            "listing": true
        },
        {
            "name": "float_by_quantity",
            "label": "Total",
            "type": "number",
            "readonly": true,
            "listing": true,
            "formula": "( parseFloat(document.getElementsByName('yes_no')[0].value) == '0' ? 0 : ( parseFloat(document.getElementsByName('float_value')[01].value * parseFloat(document.getElementsByName('quantity')[0].value ).toFixed(2) )"
        }
    ]
}
```

- `src/configs/backend/example_child_element.json` file:<br/>
Will have the child component backend configuration.<br/>
```json
{
    "table_name": "example_table",
    "notes": "Example table array attribute with 1-to-many relationship in the same table",
}
```

### Create images

- Create the `src/images` directory and copy the App images there.

- To reference the images, use the image name in a `<img src="..." />` tag. Check an example [here](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/lib/services/generic.editor.rfc.service.jsx#L333). E.g.

```js
import React from 'react';
import * as gs from "genericsuite";
const imageDirectory = gs.generalConstants.imageDirectory;
const exampleButton = () => {
   return (
      <>
         <img src={imageDirectory + "eample_button.svg"}
            alt="Example Button"
            className={"text-white fill-white"}
         />
      </>
   );
}
```

IMPORTANT: all images will be copied to the `build/static/media` directory during the local development run and qa/staging/prod deployment.

There are some pre-loaded images used by the GenericSuite library. Check [here](https://github.com/tomkat-cr/genericsuite-fe/tree/main/src/lib/images) for more details.

### Define menu options for the CRUD editors

- `src/configs/backend/app_main_menu.json` file ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/configs/backend/app_main_menu.json)):

```json
[
    {
        "title": "Home",
        "location": "top_menu",
        "type": "nav_link",
        "path": "/",
        "element": "HomePage",
        "hard_prefix": false,
        "reload": true
    },
    {
        "title": "Admin Menu",
        "location": "top_menu",
        "type": "nav_dropdown",
        "sec_group": "admin",
        "sub_menu_options": [
            {
                "type": "editor",
                "sec_group": "admin",
                "title": "Users",
                "element": "Users_EditorData"
            },
            {
                "type": "editor",
                "sec_group": "admin",
                "title": "General Config",
                "element": "GeneralConfig_EditorData"
            }
        ]
    },
    {
        "title": "Example Menu",
        "location": "top_menu",
        "type": "nav_dropdown",
        "sec_group": "users",
        "sub_menu_options": [
            {
                "type": "editor",
                "sec_group": "users",
                "title": "Example Main Element",
                "element": "ExampleMainElement_EditorData"
            }
        ]
    },
    {
        "title": "Hamburger Menu",
        "location": "hamburger",
        "sub_menu_options": [
            {
                "title": "Profile",
                "path": "/profile",
                "element": "UserProfileEditor"
            },
            {
                "title": "Preferences",
                "path": "#preferences",
                "element": "PreferencesEditor"
            },
            {
                "title": "About",
                "on_click": "|js|window.open(window.location.origin + '/#/about_body?menu=0', 'AppAboutPopUp','height=600,width=400')"
            },
            {
                "title": "Logout",
                "path": "/login",
                "on_click": "logout"
            }
        ]
    },
    {
        "title": "Other Routes",
        "sub_menu_options": [
            {
                "title": "Absolut Home",
                "path": "/",
                "element": "HomePage",
                "get_prefix": false
            },
            {
                "title": "About body",
                "path": "/about_body",
                "element": "AboutBody",
                "get_prefix": false
            }
        ]
    }
]
```

### Define API endpoints CRUD editors

- `src/configs/backend/endpoints.json` file ([example](https://github.com/tomkat-cr/genericsuite-fe/blob/main/src/configs/backend/endpoints.json))

```json
[
    {
        "name": "general_config",
        "url_prefix": "general_config",
        "routes": [
            {
                "endpoint": "/",
                "methods": ["GET", "POST", "PUT", "DELETE"],
                "handler_type": "GenericEndpointHelper",
                "view_func": "lib.util.generic_endpoint_builder.generic_route_handler",
                "params": {
                    "json_file": "general_config"
                }
            }
        ]
    },
    {
        "name": "example_table_endpoint",
        "url_prefix": "example_table_endpoint",
        "routes": [
            {
                "endpoint": "/",
                "methods": ["GET", "POST", "PUT", "DELETE"],
                "handler_type": "GenericEndpointHelper",
                "view_func": "lib.util.generic_endpoint_builder.generic_route_handler",
                "params": {
                    "json_file": "example_table"
                }
            }
        ]
    },
    {
        "name": "example_table_child_endpoint",
        "url_prefix": "example_table_child_endpoint",
        "routes": [
            {
                "endpoint": "/",
                "methods": ["GET", "POST", "PUT", "DELETE"],
                "handler_type": "GenericEndpointHelper",
                "view_func": "lib.util.generic_endpoint_builder.generic_route_handler",
                "params": {
                    "json_file": "example_table_child"
                }
            }
        ]
    }
]
```

## App backend

Follow the instructions to create the App's backend in Python [here](https://github.com/tomkat-cr/genericsuite-be/blob/main/README.md).<br/>
If the App will include AI features, click [here](https://github.com/tomkat-cr/genericsuite-be-ai/blob/main/README.md)<br/>

### Create the API starting code

For a Chalice project:

1. `app.py` in the project's root directory.

```python
"""
Exampleapp main
"""
from genericsuite.chalicelib.util.create_app import create_app

from lib.config.config import Config

# exampleapp specific endpoint deifnition
# from chalicelib.endpoints import exampleapp_specific_endpoint

# Only for API Apps using GenericSuite AI backend version
# https://github.com/tomkat-cr/genericsuite-be-ai
# from chalicelib.endpoints import ai_fynbot as ai_chatbot_endpoint

settings = Config()
app = create_app(app_name=f'{settings.APP_NAME.lower()}-backend',
    settings=settings)

# Register application specific endpoints
# app.register_blueprint(food_moments.bp, url_prefix='/exampleapp_specific_endpoint')

# Register AI endpoints
# app.register_blueprint(ai_chatbot_endpoint.bp, url_prefix='/ai')
```

2. `lib/config/config.py`

```python
"""
General configuration module
"""
# C0103 | Disable "name doesn't conform to naming rules..." (snake_case)
# pylint: disable=C0103

from typing import Any

# For GenericSuite for backend project
from genericsuite_ai.config.config import Config as ConfigSuperClass
# For GenericSuite AI for backend project
# from genericsuite_ai.config.config import Config as ConfigSuperClass


class Config(ConfigSuperClass):
    """
    General configuration parameters read from environment variables
    """

    def __init__(self, app_context: Any = None) -> None:
        super().__init__(app_context)

        # Specific API credentials and other parameters
        # self.OTHER_API_KEY = self.get_env('OTHER_API_KEY', '')
```

### Define Chalice config template

1. Create the `.chalice` directory in the project's root directory.

```bash
mkdir -p .chalice
```

2. Create the `.chalice/config-example.json` file.

```json
{
  "version": "2.0",
  "app_name": "APP_NAME_LOWERCASE_placeholder-backend",
  "lambda_memory_size": 256,
  "environment_variables": {
    "APP_NAME": "APP_NAME_placeholder",
    "AI_ASSISTANT_NAME": "AI_ASSISTANT_NAME_placeholder",
    "APP_VERSION": "APP_VERSION_placeholder",
    "APP_SECRET_KEY": "APP_SECRET_KEY_placeholder",
    "APP_SUPERADMIN_EMAIL": "APP_SUPERADMIN_EMAIL_placeholder",
    "GIT_SUBMODULE_URL": "GIT_SUBMODULE_URL_placeholder",
    "GIT_SUBMODULE_LOCAL_PATH": "GIT_SUBMODULE_LOCAL_PATH_placeholder",
    "CURRENT_FRAMEWORK": "CURRENT_FRAMEWORK_placeholder",
    "DEFAULT_LANG": "DEFAULT_LANG_placeholder",
    "FDA_API_KEY": "FDA_API_KEY_placeholder",
    "OPENAI_API_KEY": "OPENAI_API_KEY_placeholder",
    "OPENAI_MODEL": "OPENAI_MODEL_placeholder",
    "OPENAI_TEMPERATURE": "OPENAI_TEMPERATURE_placeholder",
    "GOOGLE_API_KEY": "GOOGLE_API_KEY_placeholder",
    "GOOGLE_CSE_ID": "GOOGLE_CSE_ID_placeholder",
    "LANGCHAIN_API_KEY": "LANGCHAIN_API_KEY_placeholder",
    "LANGCHAIN_PROJECT": "GOOGLE_CSE_ID_placeholder",
    "HUGGINGFACE_API_KEY": "HUGGINGFACE_API_KEY_placeholder",
    "HUGGINGFACE_ENDPOINT_URL": "HUGGINGFACE_ENDPOINT_URL_placeholder",
    "SMTP_SERVER": "SMTP_SERVER_placeholder",
    "SMTP_PORT": "SMTP_PORT_placeholder",
    "SMTP_USER": "SMTP_USER_placeholder",
    "SMTP_PASSWORD": "SMTP_PASSWORD_placeholder",
    "SMTP_DEFAULT_SENDER": "SMTP_DEFAULT_SENDER_placeholder",
    "FLASK_APP": "FLASK_APP_placeholder"
  },
  "stages": {
    "dev": {
      "api_gateway_stage": "API_GATEWAY_STAGE_placeholder",
      "environment_variables": {
        "APP_DEBUG": "APP_DEBUG_placeholder",
        "APP_STAGE": "dev",
        "APP_DB_ENGINE": "APP_DB_ENGINE_DEV_placeholder",
        "APP_DB_NAME": "APP_DB_NAME_DEV_placeholder",
        "APP_DB_URI": "APP_DB_URI_DEV_placeholder",
        "APP_FRONTEND_AUDIENCE": "APP_FRONTEND_AUDIENCE_DEV_placeholder",
        "APP_CORS_ORIGIN": "APP_CORS_ORIGIN_DEV_placeholder",
        "AWS_S3_CHATBOT_ATTACHMENTS_BUCKET": "AWS_S3_CHATBOT_ATTACHMENTS_BUCKET_DEV_placeholder"
      }
    },
    "qa": {
      "api_gateway_stage": "API_GATEWAY_STAGE_placeholder",
      "autogen_policy": false,
      "iam_role_arn": "arn:aws:iam::071141316464:role/chalice-api-dev-api_handler",
      "manage_iam_role": false,
      "certificate_arn": "",
      "certificate_arn_key": "",
      "certificate_path": "./app.APP_NAME_LOWERCASE_placeholder.local.crt",
      "private_key_path": "./app.APP_NAME_LOWERCASE_placeholder.local.key",
      "environment_variables": {
        "PORT": "5001",
        "APP_DEBUG": "APP_DEBUG_placeholder",
        "APP_STAGE": "qa",
        "APP_DB_ENGINE": "APP_DB_ENGINE_QA_placeholder",
        "APP_DB_NAME": "APP_DB_NAME_QA_placeholder",
        "APP_DB_URI": "APP_DB_URI_QA_placeholder",
        "APP_FRONTEND_AUDIENCE": "APP_FRONTEND_AUDIENCE_QA_placeholder",
        "APP_CORS_ORIGIN": "APP_CORS_ORIGIN_QA_placeholder",
        "AWS_S3_CHATBOT_ATTACHMENTS_BUCKET": "AWS_S3_CHATBOT_ATTACHMENTS_BUCKET_QA_placeholder"
      }
    },
    "prod": {
      "api_gateway_stage": "API_GATEWAY_STAGE_placeholder",
      "environment_variables": {
        "APP_DEBUG": "0",
        "APP_STAGE": "prod",
        "APP_DB_ENGINE": "APP_DB_ENGINE_PROD_placeholder",
        "APP_DB_NAME": "APP_DB_NAME_PROD_placeholder",
        "APP_DB_URI": "APP_DB_URI_PROD_placeholder",
        "APP_FRONTEND_AUDIENCE": "APP_FRONTEND_AUDIENCE_PROD_placeholder",
        "APP_CORS_ORIGIN": "APP_CORS_ORIGIN_PROD_placeholder",
        "AWS_S3_CHATBOT_ATTACHMENTS_BUCKET": "AWS_S3_CHATBOT_ATTACHMENTS_BUCKET_PROD_placeholder"
      }
    }
  }
}
```

### Define template for DynamoDB tables

If you plan to use DynamoDB as the database technoloy, you'll need to create the tables. 

This is a initial `dynamodb_cf_template.yaml` example file to automate the process:

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Resources:
  UsersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: users
      AttributeDefinitions:
        - AttributeName: "email"
          AttributeType: "S"
        # - AttributeName: "username"
        #   AttributeType: "S"
      KeySchema:
        - AttributeName: "email"
          KeyType: "HASH"
        # - AttributeName: "username"
        #   KeyType: "HASH"
      ProvisionedThroughput:
        ReadCapacityUnits: "5"
        WriteCapacityUnits: "5"

  GeneralConfigTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: general_config
      AttributeDefinitions:
        - AttributeName: "id"
          AttributeType: "S"
        # - AttributeName: "config_name"
        #   AttributeType: "S"
      KeySchema:
        - AttributeName: "id"
          KeyType: "HASH"
        # - AttributeName: "config_name"
        #   KeyType: "RANGE"
      ProvisionedThroughput:
        ReadCapacityUnits: "5"
        WriteCapacityUnits: "5"

Outputs:
  Users:
    Description: Users
    Value: !Ref "UsersTable"
  Sessions:
    Description: General Config
    Value: !Ref "GeneralConfigTable"
```

### Define SAM template

1. `scripts/aws_big_lambda/template-sam.yml`

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Outputs:
  RestAPIId:
    Value:
      Ref: RestAPI
  APIHandlerName:
    Value:
      Ref: APIHandler
  APIHandlerArn:
    Value:
      Fn::GetAtt:
      - APIHandler
      - Arn
  EndpointURL:
    Value:
      Fn::Sub: https://${RestAPI}.execute-api.${AWS::Region}.${AWS::URLSuffix}/api/
Resources:
  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties: 
      AssumeRolePolicyDocument: 
        Version: "2012-10-17"
        Statement: 
          - Effect: Allow
            Principal: 
              Service: 
                - lambda.amazonaws.com
            Action: sts:AssumeRole
      Policies: 
        - PolicyName: LambdaS3Access 
          PolicyDocument:
            Version: "2012-10-17"
            Statement: 
              - Effect: Allow 
                Action: 
                - s3:PutObject
                - s3:PutObjectAcl
                - s3:GetObject
                - s3:GetObjectAcl
                - s3:DeleteObject
                Resource: "arn:aws:s3:::AWS_S3_CHATBOT_ATTACHMENTS_BUCKET_placeholder/*"
        - PolicyName: DefaultRolePolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
            - Effect: Allow
              Action:
              - logs:CreateLogGroup
              - logs:CreateLogStream
              - logs:PutLogEvents
              Resource: arn:*:logs:*:*:*

  RestAPI:
    Type: AWS::Serverless::Api
    Properties:
      StageName: api
      EndpointConfiguration: EDGE
      Domain: 
        DomainName: api.example.com
        CertificateArn: CertificateArn_placeholder
      BinaryMediaTypes:
      - audio/mpeg
      - application/octet-stream
      DefinitionBody:
        swagger: '2.0'
        info:
          version: '1.0'
          title: APP_NAME_LOWERCASE_placeholder-backend
        schemes:
        - https
        paths:
          /menu_options:
            get:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: 'Get authorized menu options '
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''GET,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /menu_options/element:
            post:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: 'Get menu element configuration '
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''POST,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /users:
            get:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: User's CRUD operations (create, read, update, delete)
            post:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: User's CRUD operations (create, read, update, delete)
            put:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: User's CRUD operations (create, read, update, delete)
            delete:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: User's CRUD operations (create, read, update, delete)
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''GET,POST,PUT,DELETE,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /users/test:
            get:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Connection handler test
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''GET,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /users/login:
            get:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: User login
            post:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: User login
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''GET,POST,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /users/supad-create:
            post:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Super admin user emergency creation
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''POST,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /ai/chatbot:
            post:
              consumes:
              - application/json
              produces:
              - application/json
              - audio/mpeg
              - application/octet-stream
              - text/csv
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                responseTemplates:
                  application/json: '{"statusCode": 200}'
                  audio/mpeg: '{"statusCode": 200}'
                  application/octet-stream: '{"statusCode": 200}' 
                  text/csv: '{"statusCode": 200}'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                # Content type conversions in API Gateway
                # https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-payload-encodings-workflow.html
                # contentHandling: CONVERT_TO_TEXT
                # contentHandling: CONVERT_TO_BINARY
                type: aws_proxy
              summary: This function is the endpoint for the AI Chatbot.
              description: 'Retrieves the user data (question), runs the conversation with the AI Chatbot and returns the AI Chatbot''s response.'
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''POST,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /ai/image_to_text:
            post:
              consumes:
              - multipart/form-data
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: This endpoint receives an image file, saves it to a temporary
                directory
              description: 'with a uuid4 .jpg | .png filename, calls @vision_image_analyzer
                with

                the file path, and returns the result.


                :param request: The request containing the image file.

                :return: The transcription result.'
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''POST,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /ai/voice_to_text:
            post:
              consumes:
              - multipart/form-data
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: This endpoint receives an audio file, saves it to a temporary
                directory
              description: 'with a uuid4 .mp3 filename, calls @audio_to_text_transcript
                with

                the file path, and returns the result.


                :param request: The request containing the audio file.

                :return: The transcription result.'
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''POST,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /ai_chatbot_conversations:
            get:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            post:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            put:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            delete:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''GET,POST,PUT,DELETE,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /general_config:
            get:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            post:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            put:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            delete:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''GET,POST,PUT,DELETE,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

          /users_config:
            get:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            post:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            put:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            delete:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${APIHandler.Arn}/invocations
                passthroughBehavior: when_no_match
                httpMethod: POST
                contentHandling: CONVERT_TO_TEXT
                type: aws_proxy
              summary: Handles generic route requests and delegates to the appropriate
              description: "CRUD operation based on the request parameters.\n\nArgs:\n\
                \    request (AuthorizedRequest): The authorized request object.\n\
                \    kwargs (dict): Additional keyword arguments.\n\nReturns:\n  \
                \  Response: The response from the CRUD operation."
            options:
              consumes:
              - application/json
              produces:
              - application/json
              responses:
                '200':
                  description: 200 response
                  schema:
                    $ref: '#/definitions/Empty'
                  headers:
                    Access-Control-Allow-Methods:
                      type: string
                    Access-Control-Allow-Origin:
                      type: string
                    Access-Control-Allow-Headers:
                      type: string
                    Access-Control-Expose-Headers:
                      type: string
                    Access-Control-Max-Age:
                      type: string
                    Access-Control-Allow-Credentials:
                      type: string
              x-amazon-apigateway-integration:
                responses:
                  default:
                    statusCode: '200'
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: '''GET,POST,PUT,DELETE,OPTIONS'''
                      method.response.header.Access-Control-Allow-Origin: '''http://localhost:3000'''
                      method.response.header.Access-Control-Allow-Headers: '''Access-Control-Allow-Origin,Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'''
                      method.response.header.Access-Control-Expose-Headers: '''Authorization,Access-Control-Allow-Origin,Content-Type,Content-Disposition,Content-Length'''
                      method.response.header.Access-Control-Max-Age: '''600'''
                      method.response.header.Access-Control-Allow-Credentials: '''true'''
                requestTemplates:
                  application/json: '{"statusCode": 200}'
                passthroughBehavior: when_no_match
                type: mock
                contentHandling: CONVERT_TO_TEXT

        definitions:
          Empty:
            type: object
            title: Empty Schema
        x-amazon-apigateway-binary-media-types:
        - multipart/form-data
        - application/octet-stream
        - application/x-tar
        - application/zip
        - audio/basic
        - audio/ogg
        - audio/mp4
        - audio/mpeg
        - audio/wav
        - audio/webm
        - image/png
        - image/jpg
        - image/jpeg
        - image/gif
        - video/ogg
        - video/mpeg
        - video/webm



  APIHandler:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: python3.9
      Handler: app.app
      CodeUri: ./deployment.zip
      Tags:
        aws-chalice: version=1.30.0:stage=APP_STAGE_placeholder:app=APP_NAME_LOWERCASE_placeholder-backend
      Tracing: PassThrough
      Timeout: 60
      MemorySize: 256
      Environment:
        Variables:
          APP_NAME: APP_NAME_placeholder
          AI_ASSISTANT_NAME: AI_ASSISTANT_NAME_placeholder
          APP_VERSION: APP_VERSION_placeholder
          FLASK_APP: FLASK_APP_placeholder
          APP_DEBUG: APP_DEBUG_placeholder
          APP_STAGE: APP_STAGE_placeholder
          APP_SECRET_KEY: APP_SECRET_KEY_placeholder
          APP_SUPERADMIN_EMAIL: APP_SUPERADMIN_EMAIL_placeholder
          APP_FRONTEND_AUDIENCE: APP_FRONTEND_AUDIENCE_placeholder
          APP_CORS_ORIGIN: APP_CORS_ORIGIN_placeholder
          APP_DB_ENGINE: APP_DB_ENGINE_placeholder
          APP_DB_NAME: APP_DB_NAME_placeholder
          APP_DB_URI: APP_DB_URI_placeholder
          CURRENT_FRAMEWORK: CURRENT_FRAMEWORK_placeholder
          DEFAULT_LANG: DEFAULT_LANG_placeholder
          GIT_SUBMODULE_URL: GIT_SUBMODULE_URL_placeholder
          GIT_SUBMODULE_LOCAL_PATH: GIT_SUBMODULE_LOCAL_PATH_placeholder
          AWS_S3_CHATBOT_ATTACHMENTS_BUCKET: AWS_S3_CHATBOT_ATTACHMENTS_BUCKET_placeholder
          SMTP_SERVER: SMTP_SERVER_placeholder
          SMTP_PORT: SMTP_PORT_placeholder
          SMTP_USER: SMTP_USER_placeholder
          SMTP_PASSWORD: SMTP_PASSWORD_placeholder
          SMTP_DEFAULT_SENDER: SMTP_DEFAULT_SENDER_placeholder
          FDA_API_KEY: FDA_API_KEY_placeholder
          OPENAI_API_KEY: OPENAI_API_KEY_placeholder
          OPENAI_MODEL: OPENAI_MODEL_placeholder
          OPENAI_TEMPERATURE: OPENAI_TEMPERATURE_placeholder
          GOOGLE_API_KEY: GOOGLE_API_KEY_placeholder
          GOOGLE_CSE_ID: GOOGLE_CSE_ID_placeholder
          LANGCHAIN_API_KEY: LANGCHAIN_API_KEY_placeholder
          LANGCHAIN_PROJECT: LANGCHAIN_PROJECT_placeholder
          HUGGINGFACE_API_KEY: HUGGINGFACE_API_KEY_placeholder
          HUGGINGFACE_ENDPOINT_URL: HUGGINGFACE_ENDPOINT_URL_placeholder
      Role:
        Fn::GetAtt:
        - LambdaExecutionRole
        # - DefaultRole
        - Arn
  APIHandlerInvokePermission:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName:
        Ref: APIHandler
      Action: lambda:InvokeFunction
      Principal: apigateway.amazonaws.com
      SourceArn:
        Fn::Sub:
        - arn:${AWS::Partition}:execute-api:${AWS::Region}:${AWS::AccountId}:${RestAPIId}/*
        - RestAPIId:
            Ref: RestAPI
```

2. `scripts/aws_big_lambda/template-samconfig.toml`

```toml
# samconfig.toml

# More information about the configuration file can be found here:
# https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html
version = 0.1

[default]
[default.global.parameters]
stack_name = "APP_NAME_LOWERCASE_placeholder-backend"

[default.build.parameters]
cached = true
parallel = true

[default.validate.parameters]
lint = true

[default.deploy.parameters]
capabilities = ["CAPABILITY_IAM"]
confirm_changeset = false
resolve_s3 = true
s3_prefix = "APP_NAME_LOWERCASE_placeholder-backend"
region = "us-east-1"
image_repositories = []
disable_rollback = false
force_upload = true
resolve_image_repos = true

[default.package.parameters]
resolve_s3 = true

[default.sync.parameters]
watch = true

[default.local_start_api.parameters]
warm_containers = "EAGER"

[default.local_start_lambda.parameters]
warm_containers = "EAGER"

```
