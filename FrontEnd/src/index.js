import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './containers/index.css';
import App from './containers/App';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
		<App />
  </React.StrictMode>,
  document.getElementById('root')
);
