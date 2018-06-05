import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import './Nav.css';

export default class Nav extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <ul className="nav">
        {Children.map(children, c => (
          <li className="nav__item" key={c}>{c}</li>
        ))}
      </ul>
    );
  }
}
