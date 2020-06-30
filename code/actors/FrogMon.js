import {Monster} from "./Monster";
import {Vec} from "~/code/game/game";

const gravity = Monster.gravity;
const jumpSpeed = 5;

export class FrogMon extends Monster {
  size = new Vec(2, 1);

  update(timeStep, state) {
    let xSpeed = this.speed.x;
    let pos = this.pos;
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

    return new FrogMon(pos, new Vec(xSpeed, ySpeed));
  }

  static create(pos) {
    return new FrogMon(pos, new Vec(10, 0));
  }
}