import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Root from './Root/Root';
import math from 'mathjs';
window.math = math;

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();


