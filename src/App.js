import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import GsapTools from 'gsap-tools';

import Example1 from './components/example1';
import Example2 from './components/example2';

export default class App extends PureComponent {

  render() {
    return (
      <Router>
        <div className="app">
          <ul>
            <li><Link to="/example-1">Example 1</Link></li>
            <li><Link to="/example-2">Example 2</Link></li>
          </ul>

          <Route path="/example-1" component={Example1} />
          <Route path="/example-2" component={Example2} />

          <GsapTools isVisible />
        </div>
      </Router>
    );
  }
}
