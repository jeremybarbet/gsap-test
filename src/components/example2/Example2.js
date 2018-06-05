import React, { PureComponent } from 'react';
import { TweenLite, TweenMax, TimelineLite } from 'gsap';
import { add } from 'gsap-tools';

export default class Example2 extends PureComponent {

  componentDidMount() {
    setTimeout(this.animate);
  }

  animate = () => {
    const t3 = new TimelineLite();

    this.t1 = TweenLite.to('.blue', 1, { x: 520, rotate: '90deg' });
    this.t2 = TweenMax.fromTo('.green', 0.6, { x: -50 }, { x: 200 });

    t3.to('.purple', 1.2, { x: 481, skewX: 5 });

    this.disposer = add(this.t1);
    this.disposer1 = add(this.t2);
    this.disposer2 = add(t3);
  }

  componentWillUnmount() {
    this.disposer();
    this.disposer1();
    this.disposer2();
  }

  render() {
    return (
      <div>
        <h2>Example 2</h2>
        <h3>One TweenLite, one TweenMax, and one TimelineLite</h3>
        <p>We only get a timeline from the TimelineLite.</p>

        <div className="box blue" />
        <div className="box green" />
        <div className="box purple" />
      </div>
    );
  }
}
