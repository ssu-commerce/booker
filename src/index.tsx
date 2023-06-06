import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ReactDom from 'react-dom/client';
import reportWebVitals from 'reportWebVitals';
import App from './App';

const rootNode = document.getElementById('root');

if (rootNode) {
  ReactDom.createRoot(rootNode).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

reportWebVitals();
