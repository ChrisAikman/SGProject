import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './_reset.less';
import './index.less';

ReactDOM.render(
  <App
    author_id={4}
    author={'Brady'}
  />,
  document.getElementById('root')
);
