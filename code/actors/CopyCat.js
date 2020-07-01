import {Monster} from "./Monster";
import {Player} from "./Player";
import {Vec} from "~/code/game/game";

export class CopyCat extends Player {

  get type() { return "copycat"; }

  collide(state) {
    return Monster.prototype.collide.call(this, state);
  }
}