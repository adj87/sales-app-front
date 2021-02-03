import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

import dayjs from 'dayjs';
import es from 'dayjs/locale/es'; // load on demand
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale('es', es);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
