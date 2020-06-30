import {Actor} from "./Actor";
import {Vec} from "~/code/game/game";
import {State} from "~/code/game/State";

const playerXSpeed = 10;
const jumpSpeed = 17;
const gravity = Actor.gravity;

export class Player extends Actor {
  size = new Vec(0.8, 1.5);

  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }  
  get type() { return "player"; }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)),
                      new Vec(0, 0));
  }
  collide(state) {
    return state;
    throw new Error("You're doing fucking stupid things you know");
  }
  update(timeStep, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
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
    return new Player(pos, new Vec(xSpeed, ySpeed));
  }
}