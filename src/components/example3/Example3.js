import React, { PureComponent } from 'react';
import { TimelineMax } from 'gsap';
import { add } from 'gsap-tools';

export default class Example3 extends PureComponent {

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    const tl = new TimelineMax({ id: 'Infinite', repeat: -1 });

    tl.to('.blue', 1.2, { x: 120, skewX: 5 });

    this.disposer = add(tl);
  }

  componentWillUnmount() {
    this.disposer();
  }

  render() {
    return (
      <div className="exemple3">
        <h2>Example 3</h2>
        <h3>One TimelineMax with infinite option</h3>

        <div className="box blue" />
      </div>
    );
  }
}
