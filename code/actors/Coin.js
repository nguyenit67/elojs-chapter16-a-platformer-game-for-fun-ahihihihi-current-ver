import {Actor} from "./Actor";
import {Vec} from "~/code/game/game";
import {State} from "~/code/game/State";

const wobbleSpeed = 8, wobbleDist = 0.07;

export class Coin extends Actor {
  size = new Vec(0.6, 0.6);

  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }
  get type() { return "coin"; }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos,
                    Math.random() * Math.PI * 2);
  }
  collide(state) {
    let filtered = state.actors.filter(a => a !== this);
    let status = state.status;
    if (filtered.every(a => a.type !== "coin")) status = "won";
    return new State({level: state.level, 
                      actors: filtered,
                      effects: state.effects,
                      status});
  }
  
  update(timeStep) {
    let wobble = this.wobble + timeStep * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);  
  }
}