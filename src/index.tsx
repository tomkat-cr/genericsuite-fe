import React from 'react';

import { HashRouter } from 'react-router-dom';

import { HomePageGsFe } from './lib/components/HomePage/HomePageGsFe.jsx';
import { AboutBodyGsFe } from './lib/components/About/AboutBodyGsFe.jsx';

const reactDomClient = require('react-dom/client');

const app = require('./lib/components/App/App');

// This way to import the .svg files doesn't work on prod environents...
// const GsLogoCircle = require('./lib/images/gs_logo_circle.svg');
const gsLogoCircle = 'gs_logo_circle.svg';

const componentMap = {
  "AboutBody": AboutBodyGsFe,
  "HomePage": HomePageGsFe,
};

const root = reactDomClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <app.App
          // appLogo={GsLogoCircle}
          appLogo={gsLogoCircle}
          componentMap={componentMap}
      />
    </HashRouter>
  </React.StrictMode>
);
