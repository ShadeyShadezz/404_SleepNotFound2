const audioService = (() => {
  let audioEls = null;
  let ctx = null;
  let sources = [];
  let gains = [];
  let active = 0; // index of currently audible element (0 or 1)
  let playlist = [];
  let currentIndex = 0;
  const listeners = {};
  const fadeMs = 120; // crossfade duration in ms

  function ensure() {
    if (audioEls) return audioEls;
    audioEls = [document.createElement('audio'), document.createElement('audio')];
    audioEls.forEach(el => {
      el.preload = 'auto';
      el.crossOrigin = 'anonymous';
      el.style.display = 'none';
      document.body.appendChild(el);
    });

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        ctx = new AudioContext();
        audioEls.forEach((el, i) => {
          try {
            sources[i] = ctx.createMediaElementSource(el);
            gains[i] = ctx.createGain();
            gains[i].gain.value = i === active ? 1 : 0;
            sources[i].connect(gains[i]);
            gains[i].connect(ctx.destination);
          } catch (e) {
            console.warn('audioService: failed to create media source', e);
          }
        });
      }
    } catch (e) {
      console.warn('audioService: WebAudio not available', e);
      ctx = null;
    }

    // forward element events
    audioEls.forEach((el, i) => {
      ['timeupdate','loadedmetadata','canplaythrough','waiting','stalled','ended','error'].forEach(name => {
        el.addEventListener(name, (ev) => emit(name, ev));
      });
    });

    return audioEls;
  }

  function init(pl = [], start = 0) {
    playlist = Array.isArray(pl) ? pl : [];
    currentIndex = Math.max(0, Math.min(start, playlist.length - 1));
    ensure();
    if (playlist.length > 0) {
      audioEls[active].src = playlist[currentIndex].url;
    }
  }

  function getAudio() {
    ensure();
    return audioEls[active];
  }

  function play() {
    ensure();
    // try to resume audio context if suspended
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(()=>{});
    return audioEls[active].play();
  }
  function pause() {
    ensure();
    audioEls[0].pause();
    audioEls[1].pause();
  }

  function setLoop(v) {
    ensure();
    audioEls.forEach(el => el.loop = !!v);
  }

  function setTrack(index, play = false) {
    if (!playlist[index]) return;
    ensure();
    if (index === currentIndex) {
      if (play) audioEls[active].play().catch(()=>{});
      return;
    }

    const next = 1 - active;
    const nextEl = audioEls[next];
    try {
      nextEl.src = playlist[index].url;
      nextEl.currentTime = 0;
    } catch (e) {
      console.error('audioService set src error', e);
    }

    // If we have WebAudio, perform crossfade
    if (ctx && gains[active] && gains[next]) {
      const now = ctx.currentTime;
      const fadeSec = Math.max(0.05, fadeMs / 1000);
      try {
        gains[next].cancelScheduledValues(now);
        gains[active].cancelScheduledValues(now);
        gains[next].setValueAtTime(0.0001, now);
        // ensure next element plays so its buffer decodes
        nextEl.play().catch(()=>{});
        gains[next].linearRampToValueAtTime(1.0, now + fadeSec);
        gains[active].setValueAtTime(gains[active].value || 1, now);
        gains[active].linearRampToValueAtTime(0.0001, now + fadeSec);
      } catch (err) {
        console.warn('audioService crossfade failed', err);
        // fallback to immediate switch
        try { audioEls[active].pause(); nextEl.play().catch(()=>{}); } catch {}
      }
      // swap active after fade duration
      setTimeout(() => {
        try { audioEls[active].pause(); } catch {}
        active = next;
        currentIndex = index;
        emit('trackchange', currentIndex);
        if (!play) audioEls[active].pause();
      }, fadeMs + 10);
    } else {
      // no WebAudio: immediate swap
      try { audioEls[active].pause(); nextEl.play().catch(()=>{}); } catch {}
      active = next;
      currentIndex = index;
      emit('trackchange', currentIndex);
      if (!play) audioEls[active].pause();
    }
  }

  function next() {
    if (playlist.length === 0) return;
    setTrack((currentIndex + 1) % playlist.length, true);
  }
  function prev() {
    if (playlist.length === 0) return;
    setTrack((currentIndex - 1 + playlist.length) % playlist.length, true);
  }

  function on(evt, handler) {
    listeners[evt] = listeners[evt] || [];
    listeners[evt].push(handler);
  }
  function off(evt, handler) {
    if (!listeners[evt]) return;
    if (handler) listeners[evt] = listeners[evt].filter(h => h !== handler);
    else listeners[evt] = [];
  }
  function emit(evt, data) {
    (listeners[evt] || []).forEach(h => { try { h(data); } catch (e) { console.error('audioService listener error', e); } });
  }

  function getCurrentIndex() { return currentIndex; }

  return { init, play, pause, setTrack, next, prev, setLoop, on, off, getAudio, getCurrentIndex };
})();

export default audioService;
