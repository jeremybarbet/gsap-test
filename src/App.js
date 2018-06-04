import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import GsapTools from 'gsap-tools';

import Example1 from './components/example1';
import Example2 from './components/example2';
import Example3 from './components/example3';

export default class App extends PureComponent {

  render() {
    return (
      <Router>
        <div className="app">
          <ul>
            <li><Link to="/example-1">Example 1</Link></li>
            <li><Link to="/example-2">Example 2</Link></li>
            <li><Link to="/example-3">Example 3</Link></li>
          </ul>

          <Route path="/example-1" component={Example1} />
          <Route path="/example-2" component={Example2} />
          <Route path="/example-3" component={Example3} />

          <GsapTools isVisible />
        </div>
      </Router>
    );
  }
}
