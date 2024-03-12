import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from './lib/components/App/App';
import GsLogoCircle from './lib/images/gs_logo_circle.svg';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <App
          appLogo={GsLogoCircle}
      />
    </HashRouter>
  </React.StrictMode>
);
