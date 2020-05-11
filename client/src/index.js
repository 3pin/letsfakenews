// REACT JS
import '../node_modules/react/cjs/react.production.min';
import '../node_modules/react-dom/cjs/react-dom.production.min';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min';
// styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './app/app';

ReactDOM.render(<App />, document.getElementById('react'));

registerServiceWorker();
