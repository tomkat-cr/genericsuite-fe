import React from 'react';

import { HashRouter } from 'react-router-dom';

const reactDomClient = require('react-dom/client');

const app = require('./lib/components/App/App');

// This way to import the .svg files doesn't work on prod environents...
// const GsLogoCircle = require('./lib/images/gs_logo_circle.svg');

const root = reactDomClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <app.App
          // appLogo={GsLogoCircle}
          appLogo={"gs_logo_circle.svg"}
      />
    </HashRouter>
  </React.StrictMode>
);
