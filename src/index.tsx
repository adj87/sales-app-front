import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import es from 'dayjs/locale/es';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

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
