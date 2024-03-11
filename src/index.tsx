import React from 'react';

import { HashRouter } from 'react-router-dom';
import GsLogoCircle from './lib/images/gs_logo_circle.svg';

// import { createRoot } from 'react-dom/client';
const reactDomClient = require('react-dom/client');

const app = require('./lib/components/App/App');
const root = reactDomClient.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <HashRouter>
      <app.App
        appLogo={GsLogoCircle}
      />
    </HashRouter>
  </React.StrictMode>
);
