import React, { PureComponent } from 'react';
import { TimelineLite } from 'gsap';
import { add } from 'gsap-tools';

export default class Example1 extends PureComponent {

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    const tl = new TimelineLite({ id: 'main' });
    const t1 = new TimelineLite({ id: 'child1' });
    const t2 = new TimelineLite({ id: 'child2' });
    const t3 = new TimelineLite({ id: 'child3' });
    const t4 = new TimelineLite({ id: 'child4' });
    const t5 = new TimelineLite({ id: 'child5' });

    t1.to('.blue', 1, { x: 520, rotate: '90deg' });
    t2.to('#id-1', 0.6, { x: 200 });
    t3.to('.green', 1.4, { x: 285, rotate: '-25deg' });
    t4.to('#id-2', 0.8, { x: 456 });
    t5.to('.purple', 1.2, { x: 481, skewX: 5 });

    tl
      .add(t1)
      .add(t2)
      .add(t3)
      .add(t4)
      .add(t5);

    this.disposer = add(tl);
    this.disposer1 = add(t1);
    this.disposer2 = add(t2);
    this.disposer3 = add(t3);
    this.disposer4 = add(t4);
    this.disposer5 = add(t5);
  }

  componentWillUnmount() {
    this.disposer();
    this.disposer1();
    this.disposer2();
    this.disposer3();
    this.disposer4();
    this.disposer5();
  }

  render() {
    return (
      <div>
        <h2>Example 1</h2>
        <h3>One main TimelineLite to wrap 5 childs TimelineLite</h3>

        <div className="box blue" />
        <div id="id-1" className="box red" />
        <div className="box green" />
        <div id="id-2" className="box orange" />
        <div className="box purple" />
      </div>
    );
  }
}
