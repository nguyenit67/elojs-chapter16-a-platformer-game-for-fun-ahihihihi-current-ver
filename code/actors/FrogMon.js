import {Monster} from "./Monster";
import {Vec} from "~/code/game/game";

const BASIC_SQUARE = Monster.BASIC_SQUARE;

const gravity = Monster.gravity;
const jumpSpeed = 5;
const timer = 1;

export class FrogMon extends Monster {
  size = new Vec(2, 1);

  constructor(pos, speed, delay) {
    super(pos, speed);
    this.delay = delay;
  }

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
    if (state.level.touches(underPos, BASIC_SQUARE, "wall") ) {
      delay = timer;
    } else {
      delay = 0;
    }
    return new FrogMon(pos, new Vec(xSpeed, ySpeed), delay);
  }

  static create(pos) {
    return new FrogMon(pos, new Vec(10, 0), timer);
  }
}