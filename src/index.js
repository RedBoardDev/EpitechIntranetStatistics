import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DataProvider } from './contexts/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <DataProvider>
      <App />
    </DataProvider>

  </React.StrictMode>
);

