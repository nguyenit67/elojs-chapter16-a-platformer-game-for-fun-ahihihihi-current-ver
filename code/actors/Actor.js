import {NotImplementedError} from "~/code/errors";

export class Actor {
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