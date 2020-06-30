import {NotImplementedError} from "~/code/errors";
import {Vec} from "~/code/game/game";

export class Actor {
  // static BASIC_SQUARE = new Vec(1, 1);

  static gravity = 30;

  size = null;

  constructor(pos, speed, reset) { 
    if (this.constructor === Actor) {
      throw new NotImplementedError("Virtual Abstract Interface class cannot be instantiated! :O");
    }
  }
  get type() { throw new NotImplementedError(); }  
  static create(pos) { throw new NotImplementedError(); }
  collide(state) { throw new NotImplementedError(); }
  update(timeStep, state, keys) { throw new NotImplementedError(); }
}