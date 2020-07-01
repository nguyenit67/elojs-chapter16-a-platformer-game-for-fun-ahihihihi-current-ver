import {Monster} from "./Monster";
import {Player} from "./Player";
import {Vec} from "~/code/game/game";

export class CopyCat {

  get type() { return "copycat"; }

  collide(state) {
    return Monster.prototype.collide.call(this, state);
  }
}

CopyCat.prototype = new Player();