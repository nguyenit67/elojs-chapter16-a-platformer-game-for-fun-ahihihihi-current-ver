import {Monster} from "./Monster";
import {CopyCat} from "./CopyCat";
import {Vec} from "~/code/game/game";

const jumpSpeed = 17;
const gravity = Monster.gravity;

export class CopyCat extends Monster {
  size = new Vec(0.8, 1.5);

  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }  
  get type() { return "copycat"; }

  static create(pos) {
    return new CopyCat(pos.plus(new Vec(0, -0.5)),
                      new Vec(0, 0));
  }
  
  update(timeStep, state, keys) {
    let nowPlayer = state.player;
    let nextPlayer = nowPlayer.update(...arguments);
    
    let xSpeed = 0;
    if (nextPlayer.pos.x !== nowPlayer.pos.x) {
      xSpeed = nextPlayer.speed.x;    
    }

    let pos = this.pos;
    let movedX = pos.plus(
      new Vec(xSpeed * timeStep, 0));

    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + timeStep * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * timeStep));
    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;
    } else {
      ySpeed = 0;
    }
    return new CopyCat(pos, new Vec(xSpeed, ySpeed));
  }
}