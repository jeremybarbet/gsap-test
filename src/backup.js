// UTILS
_getChildrenOf = function(timeline, includeTimelines) {
  var a = [],
    cnt = 0,
    tween = timeline._first;
  while (tween) {
    if (tween instanceof TweenLite) {
      if (tween.vars.id) {
        a[cnt++] = tween;
      }
    } else {
      if (includeTimelines && tween.vars.id) {
        a[cnt++] = tween;
      }
      a = a.concat(_getChildrenOf(tween, includeTimelines));
      cnt = a.length;
    }
    tween = tween._next;
  }
  return a;
},

// UPDATE LIST
list = find(".animation-list"),
animationLabel = find(".animation-label"),
selectedAnimation, //the currently selected animation
linkedAnimation, //the animation that's linked to all the controls and scrubber. This is always _rootTween if globalSync is true, so it can be different than the selectedAnimation!
declaredAnimation, //whatever the user defines in the config object initially (often this will be null). If the user defines a string, it'll be resolved to a real Animation instance for this variable.
startTime, endTime,
updateList = function() {
  var animations = _getChildrenOf((declaredAnimation && vars.globalSync === false) ? declaredAnimation : _recordedRoot, true),
    options = list.children,
    matches = 0,
    option, i;
  if (declaredAnimation && vars.globalSync === false) {
    animations.unshift(declaredAnimation);
  } else if (!vars.hideGlobalTimeline) {
    animations.unshift(_recordedRoot);
  }
  for (i = 0; i < animations.length; i++) {
    option = options[i] || _createElement("option", list);
    option.animation = animations[i];
    matches = (i && animations[i].vars.id === animations[i-1].vars.id) ? matches + 1 : 0;
    option.setAttribute("value", (option.innerHTML = animations[i].vars.id + (matches ? " [" + matches + "]" : (animations[i+1] && animations[i+1].vars.id === animations[i].vars.id) ? " [0]" : "")));
  }
  for (; i < options.length; i++) {
    list.removeChild(options[i]);
  }
},
animation = function(anim) {
  var ts = 1,
    tl, maxDuration;
  if (!arguments.length) {
    return selectedAnimation;
  }
  if (typeof(anim) === "string") {
    anim = _getAnimationById(anim);
  }
  //console.log("animation() ", anim.vars.id);
  if (!(anim instanceof Animation)) {
    console.log("GSDevTools error: invalid animation.");
  }
  if (anim === selectedAnimation) {
    return;
  }
  if (selectedAnimation) {
    selectedAnimation._inProgress = inProgress;
    selectedAnimation._outProgress = outProgress;
  }
  selectedAnimation = anim;
  if (linkedAnimation) {
    ts = linkedAnimation.timeScale();
    if (linkedAnimation.target === declaredAnimation) {
      declaredAnimation.resume();
      linkedAnimation.kill();
    }
  }
  inProgress = selectedAnimation._inProgress || 0;
  outProgress = selectedAnimation._outProgress || 100;
  inPoint.style.left = inProgress + "%";
  outPoint.style.left = outProgress + "%";
  if (_fullyInitialized) { //don't record inProgress/outProgress unless we're fully instantiated because people may call GSDevTools.create() before creating/defining their animations, thus the inTime/outTime may not exist yet.
    record("animation", selectedAnimation.vars.id);
    record("in", inProgress);
    record("out", outProgress);
  }
  startTime = 0;
  maxDuration = Math.min(1000, vars.maxDuration || 1000, _getClippedDuration(selectedAnimation));
  if (selectedAnimation === _recordedRoot || vars.globalSync !== false) {
    _merge();
    linkedAnimation = _rootTween;
    if (_rootInstance && _rootInstance !== _self) {
      console.log("Error: GSDevTools can only have one instance that's globally synchronized.");
    }
    _rootInstance = _self;
    //_recording = true;
    if (selectedAnimation !== _recordedRoot) {
      tl = selectedAnimation;
      endTime = tl.totalDuration();
      if (endTime > 99999999) { //in the case of an infinitely repeating animation, just use a single iteration's duration instead.
        endTime = tl.duration();
      }
      while (tl.timeline.timeline) {
        startTime = (startTime / tl._timeScale) + tl._startTime;
        endTime = (endTime / tl._timeScale) + tl._startTime;
        tl = tl.timeline;
      }
    } else {
      endTime = _recordedRoot.duration();
    }
    if (endTime - startTime > maxDuration) { //cap end time at 1000 because it doesn't seem reasonable to accommodate super long stuff.
      endTime = startTime + maxDuration;
    }
    _recordedRoot.pause(startTime);
    _rootTween.vars.time = endTime;
    _rootTween.invalidate();
    _rootTween.duration(endTime - startTime).timeScale(ts);
    //wait for a tick before starting because some browsers freeze things immediately following a <select> selection, like on MacOS it flashes a few times before disappearing, so this prevents a "jump".
    if (paused) {
      //jump forward and then back in order to make sure the start/end values are recorded internally right away and don't drift outside this tween.
      _rootTween.progress(1).pause(0);
    } else {
      TweenLite.delayedCall(0.01, function() {
        _rootTween.resume().progress(inProgress / 100);
        if (paused) {
          play();
        }
      });
    }

  } else {
    if (_rootInstance === _self) {
      _rootInstance = null;
    }
    if (selectedAnimation === declaredAnimation || !declaredAnimation) {
      linkedAnimation = selectedAnimation;
    } else { //if an animation is declared in the config object, and the user chooses a sub-animation (nested), we tween the playhead of the declaredAnimation to keep everything synchronized even though globalSync isn't true.
      tl = selectedAnimation;
      endTime = tl.totalDuration();
      if (endTime > 99999999) { //in the case of an infinitely repeating animation, just use a single iteration's duration instead.
        endTime = tl.duration();
      }
      while (tl.timeline.timeline && tl !== declaredAnimation) {
        startTime = (startTime / tl._timeScale) + tl._startTime;
        endTime = (endTime / tl._timeScale) + tl._startTime;
        tl = tl.timeline;
      }
      if (endTime - startTime > maxDuration) { //cap end time at 1000 because it doesn't seem reasonable to accommodate super long stuff.
        endTime = startTime + maxDuration;
      }
      declaredAnimation.pause(startTime);
      linkedAnimation = TweenLite.to(declaredAnimation, endTime - startTime, {time:endTime, ease:Linear.easeNone, data:"root"});
      linkedAnimation.timeScale(ts);
    }
    _rootTween.pause();
    _recordedRoot.resume();
    linkedAnimation.seek(0);
  }

  durationLabel.innerHTML = linkedAnimation.duration().toFixed(2);
  _selectValue(list, selectedAnimation.vars.id, animationLabel);
},
updateRootDuration = function() {
  var time, ratio, duration;
  if (selectedAnimation === _recordedRoot) {
    time = _recordedRoot._time;
    _recordedRoot.progress(1, true).time(time, true); //jump to the end and back again because sometimes a tween that hasn't rendered yet will affect duration, like a TimelineMax.tweenTo() where the duration gets set in the onStart.
    time = (_rootTween._timeline._time - _rootTween._startTime) * _rootTween._timeScale;
    duration = Math.min(1000, _recordedRoot.duration());
    if (duration === 1000) {
      duration = Math.min(1000, _getClippedDuration(_recordedRoot));
    }
    ratio = _rootTween.duration() / duration;
    if (ratio !== 1 && duration) {
      inProgress *= ratio;
      if (outProgress < 100) {
        outProgress *= ratio;
      }
      _rootTween.seek(0);
      _rootTween.vars.time = duration;
      _rootTween.invalidate();
      _rootTween.duration(duration);
      _rootTween.time(time);
      durationLabel.innerHTML = duration.toFixed(2);
      updateProgress(true);
    }
  }
},
onChangeAnimation = function(e) {
  animation(list.options[list.selectedIndex].animation);
  if (e.target && e.target.blur) { //so that if an option is selected, and then the user tries to hit the up/down arrow, it doesn't just try selecting something else in the <select>.
    e.target.blur();
  }
  if (paused) {
    play();
  }
},
