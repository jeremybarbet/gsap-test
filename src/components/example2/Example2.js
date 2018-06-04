import React, { PureComponent } from 'react';
import { TweenLite, TweenMax, TimelineMax, TimelineLite, Power1, Power2, Linear, Power4, SlowMo, Elastic, Back, Bounce, RoughEase } from 'gsap';
import { add } from 'gsap-tools';
import $ from 'jquery';

import './Example2.css';

window.jQuery = window.$ = $;

export default class Example2 extends PureComponent {

  componentDidMount() {
    setTimeout(this.animate, 800);
  }

  animate = () => {
    const master = new TimelineMax({ delay: 1.2, id: 'Hero Animation' });
    const bg = $('#featureBackground');
    const centerY = $('#featureAnimation').height() / 2;
    const centerX = $('#featureAnimation').width() / 2;
    const radius = Math.max(centerX, centerY) + 50;
    const slider = $('#ctrl_slider');
    const sliderValue = { value: 0 };
    // const _isOldIE = (document.all && !document.addEventListener);
    const _isOldIE = true;

    TweenLite.set('#featureAnimation, #featureBox, #violator', { left: '50%', x: 0, xPercent: -50 });
    TweenLite.set('#featureAnimation', { perspective: 700, visibility: 'visible' });
    TweenLite.set('.featureTextGreen', { textShadow: '0px 0px 8px #91e600' });

    function whyGSAP() {
      var tl = new TimelineLite({id:'Why GSAP?'}),
          text = $('#whyGSAP'),
          split = 'whyGSAP',
          chars = split,
          centerIndex = Math.floor(chars.length / 2),
          i;
      for (i = 0; i < chars.length; i++) {
        tl.from(chars[i], 1.8, {x:(i - centerIndex) * 40, opacity:0, ease:Power2.easeOut}, i * 0.1);
      }
      tl.fromTo(text, 4, {z:500, y:74, visibility:'visible'}, {z:-1000, ease:SlowMo.ease.config(0.1, 0.9)}, 0);
      tl.to(text, 1.5, {rotationX:-720, autoAlpha:0, scale:0.3, ease:Power2.easeInOut}, '-=1.5');
      return tl;
    }

    function performance() {
      var tl = new TimelineLite({id:'Performance'}),
          text = $('#performance'),
          duration = 0.6,
          i = 45,
          repeats = 2,
          stars = [],
          star, angle, delay;
      while (--i > -1) {
        star = $('<img class="star" src="//www.greensock.com/js/img/dot.png"/>').appendTo(bg);
        stars.push(star);
        angle = Math.random() * Math.PI * 2;
        delay = Math.random() * duration;
        tl.set(star, {display:'block'}, delay);
        if (_isOldIE) {
          //IE8 and earlier perform better when animating top/left/width/height instead of x/y/scale.
          TweenLite.set(star, {width:1, height:1, top:centerY, left:centerX});
          tl.add( new TweenMax(star, duration, {
            top:(centerY + Math.sin(angle) * radius) | 0,
            left:(centerX + Math.cos(angle) * radius) | 0,
            width:22,
            height:22,
            ease:Power4.easeIn,
            repeat:repeats,
            repeatDelay:Math.random() * duration}),
                 delay);
        } else {
          TweenLite.set(star, {scale:0.05, top:centerY, left:centerX, z:0.1});
          tl.add( new TweenMax(star, duration, {
            y:Math.sin(angle) * radius,
            x:Math.cos(angle) * radius,
            scale:1.5,
            ease:Power4.easeIn,
            repeat:repeats,
            repeatDelay:Math.random() * duration}),
                 delay);
        }
      }
      tl.fromTo(text, 3, {scale:0.1, y:centerY-36, z:0.1}, {scale:1.8, ease:SlowMo.ease.config(0.5, 0.4)}, 0.3);
      tl.fromTo(text, 3, {opacity:0}, {autoAlpha:1, ease:SlowMo.ease.config(0.5, 0.4, true)}, 0.3);
      tl.set(stars, {display:'none'});
      return tl;
    }

    function compatibility() {
      var tl = new TimelineLite({id:'Compatibility'}),
          iconTimeline = new TimelineMax({repeat:1}),
          icons = $('#browserIcons img'),
          text = $('#compatibility'),
          split = 'compatibility',
          rough = RoughEase.ease.config({strength:2, clamp:true}),
          i;
      for (i = 0; i < icons.length; i++) {
        iconTimeline.fromTo(icons[i], 0.6, {scaleX:0, opacity:0.4, z:0.1}, {autoAlpha:1, scaleX:1, ease:Power2.easeOut});
        iconTimeline.to(icons[i], 0.6, {scaleX:0, opacity:0.4, ease:Power2.easeIn});
        iconTimeline.set(icons[i], {visibility:'hidden'});
      }
      tl.add(iconTimeline, 0);
      tl.fromTo('#browserIcons', 2.8, {transformOrigin:'center -160px', rotation:170, z:0.1}, {rotation:0, ease:Elastic.easeOut}, 0);
      tl.set(text, {y: centerY-35, x:10, autoAlpha:1}, 0);
      for (i = 0; i < split.length; i++) {
        tl.fromTo(split[i], 2.4, {transformOrigin:'center -160px', z:0.1, rotation:((Math.random() < 0.5) ? 90 : -90)}, {rotation:0, ease:Elastic.easeOut}, 0.3 + i * 0.06);

        tl.to(split[i], 0.6, {y:97, ease:Bounce.easeOut}, 3.4 + Math.random() * 0.6);
        tl.to(split[i], 0.6, {autoAlpha:0, ease:rough}, 4.5 + Math.random());
      }
      TweenLite.set('#fallDown', {width:420, left:300, top:-35, autoAlpha:0, textAlign:'left'});
      tl.to('#fallDown', 0.5, {top:81, autoAlpha:1, ease:Back.easeOut}, 3.9);
      tl.to('#browserIcons', 0.5, {autoAlpha:0}, 8);
      tl.to('#fallDown', 0.5, {left:'-=100', autoAlpha:0, ease:Power1.easeIn}, 8);
      return tl;
    }

    function transforms() {
      var tl = new TimelineLite({id:'Transforms'}),
          split = 'Transforms',
          box = document.getElementById('transformBox'),
          transformSub = document.getElementById('transformSub'),
          scale = split[0],
          rotate = split[1],
          move = [split[2], split[3]],
          independently = split[4];
      TweenLite.set(split, {autoAlpha:0, rotationX:-90});
      TweenLite.set(box, {scale:0.1, rotation:0.1, autoAlpha:0});
      tl.to(box, 0.3, {autoAlpha:1});
      tl.to(box, 7, {scale:1, ease:Linear.easeNone, autoRound:false}, 0);
      tl.to(scale, 0.5, {autoAlpha:1, rotationX:0, transformOrigin:'50% 50% -35px'}, 0);
      tl.to(box, 6, {rotation:360.2}, 1);
      tl.to(rotate, 0.5, {autoAlpha:1, rotationX:0, transformOrigin:'50% 50% -35px'}, 1);
      tl.to(box, 0.3, {x:60, ease:Power1.easeInOut}, 2.2);
      tl.to(box, 1.8, {x:0, ease:Elastic.easeOut}, 2.5);
      tl.to(move, 0.5, {autoAlpha:1, rotationX:0, transformOrigin:'50% 50% -35px'}, 2);
      tl.to(independently, 0.5, {autoAlpha:1, rotationX:0, transformOrigin:'50% 50% -35px'}, 2.5);
      tl.to(box, 3, {rotationX:360, ease:Elastic.easeOut}, 3.5);
      tl.from(transformSub, 0.5, {top:'-=16', autoAlpha:0}, 4.5);
      tl.to([transformSub, box], 0.5, {autoAlpha:0}, 7.4);
      tl.staggerTo(split.slice(0, 4), 0.5, {rotationX:90, autoAlpha:0}, 0.2, 7);
      tl.to(independently, 0.5, {rotationX:-90, autoAlpha:0}, 7.3);
      return tl;
    }

    function animateAnything() {
      var tl = new TimelineLite({id:'Animate Anything'}),
          anything = document.getElementById('anything'),
          icon = document.getElementById('anythingIcon'),
          sub = document.getElementById('anythingSub');
      TweenLite.set([anything,icon], {autoAlpha:0});
      tl.to([anything, icon], 0.9, {autoAlpha:1});
      tl.to(anything, 2.5, {scrambleText:{text:'Animate anything', revealDelay:0.7}}, 0);
      tl.from(sub, 0.5, {top:'-=20', autoAlpha:0}, 2.5);
      tl.staggerTo([anything, sub, icon], 0.6, {left:'-=150', autoAlpha:0, ease:Power1.easeIn}, 0.1, 6);
      return tl;
    }

    function control() {
      var dots = new TimelineLite({paused:true}),
          tl = new TimelineLite({id:'Control Anything'}),
          qty = 30,
          duration = 2.5,
          xProp = _isOldIE ? 'left' : 'x',
          yProp = _isOldIE ? 'top' : 'y',
          colors = ['#91e600','#84d100','#73b403','#528003'],
          startVars = {css:{}},
          initialVars = {css:{borderRadius:'50%', width:100, z:0.1}, immediateRender:true},
          split = 'controlSub',
          pause = split[0],
          play = split[1],
          reverse = split[2],
          timeScale = [split[3], split[4]],
          subEnd = [split[5], split[6], split[7], split[8]],
          dot, i, delay;
      startVars.css[xProp] = initialVars.css[xProp] = 680;
      startVars.css[yProp] = initialVars.css[yProp] = 220;
      for (i = 0; i < qty; i++) {
        dot = $('<div class="dot"/>').appendTo(bg)[0];
        initialVars.css.width = initialVars.css.height = ((Math.random() * 15 + 10) | 0);
        initialVars.css.backgroundColor = colors[(Math.random() * colors.length) | 0];
        TweenLite.set(dot, initialVars);
        delay = Math.random() * duration;
        dots.to(dot, duration, {physics2D:{velocity:Math.random() * 300 + 150, angle:Math.random() * 40 + 250, gravity:400, xProp:xProp, yProp:yProp}}, delay);
        dots.fromTo(dot, duration, startVars, {physics2D:{velocity:Math.random() * 300 + 150, angle:Math.random() * 60 + 240, gravity:400, xProp:xProp, yProp:yProp}, immediateRender:false, overwrite:'none'}, delay + duration);
        dots.fromTo(dot, duration, startVars, {physics2D:{velocity:Math.random() * 300 + 150, angle:Math.random() * 60 + 240, gravity:400, xProp:xProp, yProp:yProp}, immediateRender:false, overwrite:'none', display:'none'}, delay + duration * 2);
      }
      tl.to(dots, 2.2, {time:2.2, ease:Linear.easeNone}, 0);
      tl.from('#control', 0.5, {left:'+=100', autoAlpha:0}, 0);
      tl.from(pause, 0.4, {autoAlpha:0, scale:2}, 2);
      tl.from(play, 0.4, {autoAlpha:0, scale:2}, 4);
      tl.to(dots, 2, {time:4.2, ease:Linear.easeNone}, 4.2);
      tl.from(reverse, 0.4, {autoAlpha:0, scale:2}, 6);
      tl.to(dots, 2, {time:2.2, ease:Linear.easeNone}, 6.2);
      tl.from(timeScale, 0.4, {autoAlpha:0, scale:2}, 8);
      tl.to(dots, 2, {time:3.2, ease:Linear.easeNone}, 8.2);
      tl.from(subEnd, 0.4, {autoAlpha:0}, 10);
      tl.to(dots, 3, {time:dots.duration(), ease:Linear.easeNone}, 10.2);
      tl.staggerTo(['#control', '#controlSub'], 0.8, {left:'-=100', autoAlpha:0, ease:Power1.easeIn}, 0.15, 12.6);
      return tl;
    }

    function newStandard() {
      var tl = new TimelineLite(),
          GSAP = document.getElementById('GSAP'),
          split = 'GreenSock Animation Platform',
          chars = split,
          positions = [chars[0].offsetLeft],
          i, xOffset;
      positions[5] = chars[1].offsetLeft;
      positions[9] = chars[2].offsetLeft;
      positions[18] = chars[3].offsetLeft;
      GSAP.innerHTML = 'GreenSock Animation Platform';
      tl.staggerFrom(split, 1.5, {z:-1000, autoAlpha:0, ease:Power1.easeOut}, 0.3);
      tl.from('#newStandardText', 1, {autoAlpha:0});
      if (!_isOldIE) {
        chars = split;
        for (i = 0; i < chars.length; i++) {
          TweenLite.set(chars[i], {force3D:true});
          if (positions[i]) {
            xOffset = positions[i] - (chars[i].offsetLeft + chars[i].parentNode.offsetLeft);
            tl.to(chars[i], 3, {bezier:{values:[{x:20, y:0}, {x:40, y:0}, getRandomPosition(chars[i], true), {x:xOffset - 100, y:0}, {x:xOffset - 10, y:0}, {x:xOffset, y:0}], autoRotate:true}, ease:Power2.easeInOut, color:'#91e600'}, i * 0.05 + 5);
          } else {
            tl.to(chars[i], 3, {bezier:{values:[{x:20, y:0}, {x:40, y:0}, getRandomPosition(chars[i], true), getRandomPosition(chars[i], false)], autoRotate:true}, ease:Power2.easeInOut}, i * 0.05 + 5);
            tl.set(chars[i], {autoAlpha:0}, 8 + i * 0.05);
          }
        }
      }
      return tl;
    }

    function getRandomPosition(element, inside) {
      var xStart = element.offsetLeft + element.parentNode.offsetLeft;
      return {x:Math.random() * 950 - xStart, y:(inside ? Math.random() * 160 - 80 : (Math.random() < 0.5) ? 200 : -200)};
    }

    function replayReveal() {
      var tl = new TimelineLite(),
          $replayIcon = $('#replayIcon'),
          $replay = $('#replay').mouseenter(function(){
            TweenLite.to($replayIcon, 0.4, {rotation:'+=360'});
            TweenLite.to($replay, 0.4, {opacity:1});
          }).mouseleave(function(){
            TweenLite.to($replay, 0.4, {opacity:0.65});
          }).click(function(){
            master.restart();
          });
      tl.from($replay, 0.5, {autoAlpha:0, scale:2});
      tl.from($replayIcon, 0.5, {rotation:'360_ccw'});
      return tl;
    }

    // build master timeline with nested scenes...
    master.add(whyGSAP())
      .add(performance(), '-=1')
      .add(compatibility(), '-=0.5')
      .add(transforms(), '-=3.6')
      .add(animateAnything(), '-=0.5')
      .add(control(), '-=0.5')
      .add(newStandard());

    this.disposer = add(master);
  }

  componentWillUnmount() {
    this.disposer();
  }

  render() {
    return (
      <div className="exemple2">
        <div id="featureBox" />

        <div
          style={{ position: 'relative', width: '936px', height: 0, overflow: 'visible', zIndex: 20 }}
          id="violator"
        >
          <img
            src="http://greensock.com/_img/HTML5_corner_banner.png"
            style={{ position: 'absolute', top: '-5px', right: '-5px' }}
            alt="HTML5"
          />
        </div>

        <div className="feature" id="featureAnimation">
          <div id="featureBackground" style={{ pointerEvents: 'none' }} />
          <div className="featureTextWhite" id="whyGSAP">Why GSAP?</div>
          <div className="featureTextGreen" id="performance">Performance</div>
          <div className="featureTextWhite" id="compatibility">Compatibility</div>

          <div id="browserIcons">
            <img src="http://greensock.com/_img/browser-chrome-big.png" width="82" height="80" />
            <img src="http://greensock.com/_img/browser-safari-big.png" width="77" height="86" />
            <img src="http://greensock.com/_img/browser-ie-big.png" width="82" height="74" />
            <img src="http://greensock.com/_img/browser-firefox-big.png" width="82" height="83" />
            <img src="http://greensock.com/_img/browser-opera-big.png" width="69" height="75" />
          </div>

          <div className="featureTextMinor" id="fallDown">Other tools fall down in older browsers, but GSAP is remarkably compatible.</div>
          <img id="anythingIcon" src="http://greensock.com/_img/animate-anything.png" width="102" height="108" style={{ position: 'absolute', top: '50px', left: '143px', display: 'block' }} />
          <div id="transformBox" style={{ backgroundColor: '#91e600', width: '130px', height: '130px', position: 'absolute', top: '40px', left:'100px' }} />
          <div className="featureTextWhite" id="transform" style={{ fontSize: '34px', width: '640px', textAlign: 'left', left: '270px', top: '80px', lineHeight: '36px' }}>Scale, rotate & move independently</div>
          <div className="featureTextWhite" id="transformSub" style={{ fontSize: '16px', width: '420px', textAlign: 'left', left: '270px', top: '122px', color: '#CCCCCC' }}>(impossible with CSS animations/transitions)</div>
          <div className="featureTextWhite" id="anything" style={{ width: '620px', textAlign: 'left', left: '302px', top:'63px' }}>XNJYHQLJYQEW</div>
          <div className="featureTextWhite" id="anythingSub" style={{ fontSize: '16px', width: '390px', textAlign: 'left', left: '300px', top: '122px', color: '#CCCCCC' }}>CSS, SVG, canvas libraries, colors, beziers, etc.</div>
          <div className="featureTextWhite" id="control" style={{ textAlign: 'left', top: '64px', left: '130px' }}>Total control</div>
          <div className="featureTextWhite" id="controlSub" style={{ fontSize: '16px', textAlign: 'left', left: '130px', top: '122px', color: '#CCCCCC' }}>pause(), play(), reverse(), or timeScale() any tween or sequence.</div>
          <div className="featureTextWhite" id="GSAP" style={{ top: '60px' }}>GSAP</div>
          <div className="featureTextMinor" id="newStandardText" style={{ top: '125px', textAlign: 'center', width: '936px' }}>The new standard for HTML5 animation</div>

          <div id="featureClick" style={{ position: 'absolute', width: '936px', height: '220px' }}>
            <img src="http://greensock.com/_img/blank.gif" width="936" height="220" />
          </div>

          <div id="replay" style={{ textAlign: 'right', position: 'absolute', left: '825px', top: '190px', cursor: 'pointer', color: '#999999', fontSize: '12px', width: '100px', visibility: 'hidden' }}>
            replay <img id="replayIcon" src="http://greensock.com/_img/codepen/allDevicesBanner/replay.png" width="19" height="19" style={{ marginLeft: '2px', verticalAlign: 'middle' }} />
          </div>

          <div id="ctrl_slider" />
        </div>
      </div>
    );
  }
}
