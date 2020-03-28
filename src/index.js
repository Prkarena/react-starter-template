import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Routes from './routes';

const App = (props) => {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
