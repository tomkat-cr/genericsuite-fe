import React from 'react';
import reactDomClient from 'react-dom/client';
// import { HashRouter } from 'react-router-dom';

import { HomePageGsFe as HomePage} from './lib/components/HomePage/HomePageGsFe.jsx';
import { AboutBodyGsFe as AboutBody } from './lib/components/About/AboutBodyGsFe.jsx';
import { App } from './lib/components/App/App.jsx';

// This way to import the .svg files doesn't work on prod environents:
// const GsLogoCircle = require('./lib/images/gs_logo_circle.svg');
//    <app.App appLogo={GsLogoCircle} />

// This is the right way to use the .svg files:
const gsLogoCircle = 'gs_logo_circle.svg';
// const gsLogoLandscape = 'app_logo_landscape.svg';

const componentMap = {
  // "AboutBody": AboutBodyGsFe,
  // "HomePage": HomePageGsFe,
  "AboutBody": AboutBody,
  "HomePage": HomePage,
};

const root = reactDomClient.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    {/* <HashRouter> */}
      <App
          appLogo={gsLogoCircle}
          // appLogoHeader={gsLogoLandscape}
          componentMap={componentMap}
      />
    {/* </HashRouter> */}
  </React.StrictMode>
);
