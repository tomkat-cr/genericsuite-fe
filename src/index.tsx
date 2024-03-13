import React from 'react';

import { HashRouter } from 'react-router-dom';

const reactDomClient = require('react-dom/client');

const app = require('./lib/components/App/App');
const GsLogoCircle = require('./lib/images/gs_logo_circle.svg');

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
