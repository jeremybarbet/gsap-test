import React, { Component } from 'react';
import { TimelineLite } from 'gsap/all';
import GsapTools, { add } from 'gsap-tools';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    const tl = new TimelineLite({ id: 'main', paused: false });
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

  componentWillUnmout() {
    this.disposer();
    this.disposer1();
    this.disposer2();
    this.disposer3();
    this.disposer4();
    this.disposer5();
  }

  render() {
    return (
      <div className="app">
        <div className="box blue" />
        <div id="id-1" className="box red" />
        <div className="box green" />
        <div id="id-2" className="box orange" />
        <div className="box purple" />

        <GsapTools isVisible />
      </div>
    );
  }
}

export default App;
