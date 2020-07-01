import {DOMDisplay} from "~/code/display/DOMDisplay";
import {State} from "./State";
import {Level} from "./Level";

const HEALTH = 10;

export class Vec {
  static BASIC_SQUARE = new Vec(1, 0.1);

  constructor(x, y) {
    this.x = x; this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

const oldRunLevel = runLevel;
runLevel = (level, Display) => {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let running = true;

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      running ^= true;
    }
  });

  return new Promise(resolve => {
    runAnimation(time => {
      console.log(time);
      if (running) {
        state = state.update(time, arrowKeys);
        display.syncState(state);
      }
      if (state.status === "playing" || !running) {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

export async function runGame(plans, Display) {
  for (let level = 0; level < plans.length;) {
    let status = await runLevel(new Level(plans[level]),
                                Display);
    if (status == "won") level++;
  }
  console.log("You've won!");
}

const healthStr = health => "❤".repeat(health);

const healthBar = DOMDisplay.$(".health-bar");
const controllerBar = DOMDisplay.$("#controller-bar");

function trackTouchAndKeys(keys) {
  let down = Object.create(null);
  function keyTrack(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type !== "keyup";
      event.preventDefault();
    }
  }

  const keyFor = Object.create(null);
  for(let akey of keys) {
    keyFor[akey.toLowerCase()] = akey;
  }
  function btnTouch(event) {
    let id = event.target.id;
    if (event.type !== "touchstart" && id in keyFor) {
      down[keyFor[id]] = false;
    }
    let touchList = event.touches;
    // if (event.type === "touchmove" && touchList.length > 0) {
    //   // console.log(event.type, event.target, 
    //   //     Array.from(event.targetTouches).map(touch => touch));
    //   // down[keyFor[id]] = event.type !== "touchend";
    // }
    for(let touch of touchList) {
      let id = touch.target.id;
      if (id in keyFor) {
        down[keyFor[id]] = event.type !== "touchend";
      }
    }
  }
  const key_events = ["keydown", "keyup"];
  const touch_events = ["touchstart", "touchmove", "touchend"];

  for(let eventType of key_events) {
    window.addEventListener(eventType, keyTrack);
  }
  for(let eventType of touch_events) {
    window.addEventListener(eventType, btnTouch);
    // for(let id in keyFor) {
    //   DOMDisplay.$(`#${id}`).addEventListener(eventType, btnTouch);
    // }
  }

  return down;
}

const arrowKeys =
  trackTouchAndKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

exports.runGame = async (plans, Display) => {
  let health = HEALTH;
  healthBar.textContent = healthStr(health);
  document.body.appendChild(healthBar);
  class ExtendDisplay extends Display {
    constructor() {
      super(...arguments);
      this.dom.insertBefore(healthBar, this.dom.firstChild);
      this.dom.appendChild(controllerBar);
    }
  }

  for (let level = 0; level < plans.length;) {
    let status = await runLevel(new Level(plans[level]), 
                                ExtendDisplay);
    if (status === "won") level++;
    else {
      health--;
      healthBar.textContent = healthStr(health);
      if (health === 0) {
        alert("Game over!");
        return;
      }
    }
  }
  alert("You've won! 🏆🤩🥳🎉🎉🎉");
}

// exports.State = class extends State{
//   constructor() {
//     super(...arguments);
//     let [{effects}] = arguments;
//     console.log(effects);
//   }
// }