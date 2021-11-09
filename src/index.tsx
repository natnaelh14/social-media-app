import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
const store = require('./redux/store.ts')
import './index.css';
import App from './app/App';
import './bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

