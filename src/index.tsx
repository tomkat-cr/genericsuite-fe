import React from 'react';

import { HashRouter } from 'react-router-dom';

// import { createRoot } from 'react-dom/client';
const reactDomClient = require('react-dom/client');

// import { App } from './_components/App';
const app = require('./_components/App');

// const root = createRoot(document.getElementById('root'));
const root = reactDomClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <app.App />
    </HashRouter>
  </React.StrictMode>
);
