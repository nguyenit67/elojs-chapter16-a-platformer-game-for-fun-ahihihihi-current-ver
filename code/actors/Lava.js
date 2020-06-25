import {Actor} from "./Actor";
import {Vec} from "~/code/game/game";
import {State} from "~/code/game/State";

export class Lava extends Actor {
  size = new Vec(1, 1);

  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() { return "lava"; }

  static create(pos, ch) {
    if (ch === "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch === "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch === "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
  collide(state) {    
    return new State({level: state.level, 
                      actors: state.actors, 
                      effects: state.effects,
                      status: "lost"});
  }
  update(timeStep, state) {
    let newPos = this.pos.plus(this.speed.times(timeStep));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.pos, this.speed.times(-1));
    }
  }
}