import React from 'react';
import { createRoot } from 'react-dom/client';
// import { HashRouter } from 'react-router-dom';

import { App } from './lib/components/App/App';

// This way to import the .svg files doesn't work on prod environents:
// const GsLogoCircle = require('./lib/images/gs_logo_circle.svg');
//        or
// import GsLogoCircle from './lib/images/gs_logo_circle.svg';
//    <app.App appLogo={GsLogoCircle} />

// This is the right way to use the .svg files:
const gsLogoCircle = 'gs_logo_circle.svg';
const gsLogoLandscape = 'app_logo_landscape.svg';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <HashRouter> */}
      <App
          // appLogo={GsLogoCircle}
          appLogo={gsLogoCircle}
          appLogoHeader={gsLogoLandscape}
      />
    {/* </HashRouter> */}
  </React.StrictMode>
);
