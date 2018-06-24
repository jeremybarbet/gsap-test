import React, { PureComponent } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import GsapTools from 'gsap-tools';

import Nav from './components/nav';

import Example1 from './components/example1';
import Example2 from './components/example2';
import Example3 from './components/example3';
import Example4 from './components/example4';

import './App.css';

export default class App extends PureComponent {

  render() {
    return (
      <Router>
        <div className="app">
          <Nav>
            <Link to="/example-1">Example 1</Link>
            <Link to="/example-2">Example 2</Link>
            <Link to="/example-3">Example 3</Link>
            <Link to="/example-4">Example 4</Link>
          </Nav>

          <Route path="/example-1" component={Example1} />
          <Route path="/example-2" component={Example2} />
          <Route path="/example-3" component={Example3} />
          <Route path="/example-4" component={Example4} />

          <GsapTools isVisible />
        </div>
      </Router>
    );
  }
}
