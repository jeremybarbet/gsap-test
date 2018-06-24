import React, { PureComponent } from 'react';
import { TimelineLite, TweenLite } from 'gsap';
import { add } from 'gsap-tools';

export default class Example4 extends PureComponent {

  componentWillUnmount() {
    if (this.disposer1) {
      this.disposer1();
    }

    if (this.disposer2) {
      this.disposer2();
    }

    if (this.disposer3) {
      this.disposer3();
    }
  }

  playAnimation1 = () => {
    const t1 = new TimelineLite();

    t1.to('.blue', 1.2, { x: 120, skewX: 5 });

    this.disposer1 = add(t1, 'TimelineLite');
  }

  playAnimation2 = () => {
    const t2 = new TimelineLite();

    t2.to('.green', 2.5, { x: 40, y: 20 });

    this.disposer2 = add(t2);
  }

  playAnimation3 = () => {
    this.t3 = TweenLite.to('.purple', 1.75, { x: 200, skewY: 30, rotate: 20 });

    this.disposer3 = add(this.t3);
  }

  remove = (id) => {
    if (this[`disposer${id}`]) {
      this[`disposer${id}`]();
    }
  }

  render() {
    return (
      <div className="exemple3">
        <h2>Example 4</h2>
        <h3>Add animations after user action</h3>

        <div className="buttons">
          <div className="group">
            <button onClick={this.playAnimation1}>Add anim #1</button>
            <button onClick={() => this.remove('1')}>Remove anim #1</button>
          </div>

          <div className="group">
            <button onClick={this.playAnimation2}>Add anim #2</button>
            <button onClick={() => this.remove('2')}>Remove anim #2</button>
          </div>

          <div className="group">
            <button onClick={this.playAnimation3}>Add anim #3</button>
            <button onClick={() => this.remove('3')}>Remove anim #3</button>
          </div>
        </div>

        <div className="box blue" />
        <div className="box green" />
        <div className="box purple" />
      </div>
    );
  }
}
