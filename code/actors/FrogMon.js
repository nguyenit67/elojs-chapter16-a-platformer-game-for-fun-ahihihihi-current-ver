import {Monster} from "./Monster";
import {Vec} from "~/code/game/game";


const gravity = Monster.gravity;
const jumpSpeed = 17;
const timer = 0.5;

export class FrogMon extends Monster {
  size = new Vec(1.5, 1);

  constructor(pos, speed, delay) {
    super(pos, speed);
    this.delay = delay;
  }

  get type() { return "frog"; }

  update(timeStep, state) {
    let pos = this.pos;
    let delay = this.delay - timeStep;
    if (delay > 0) {
      return new FrogMon(pos, this.speed, delay);
    }

    let xSpeed = this.speed.x;
    let movedX = pos.plus(new Vec(xSpeed * timeStep, 0) );
    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    } else {
      xSpeed = -xSpeed;
    }

    let ySpeed = this.speed.y + gravity * timeStep;
    let movedY = pos.plus(new Vec(0, ySpeed * timeStep) );
    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (ySpeed > 0) {
      ySpeed = -jumpSpeed;
    } else {
      ySpeed = 0;
    }

    let underPos = new Vec( pos.x, pos.y + this.size.y );
    if (state.level.touches(underPos, Vec.UNDER_RECT, "wall") ) {
      delay = timer;
    } else {
      delay = 0;
    }
    return new FrogMon(pos, new Vec(xSpeed, ySpeed), delay);
  }

  static create(pos) {
    return new FrogMon(pos, new Vec(10, 0), 0);
  }

}