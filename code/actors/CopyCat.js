import {Monster} from "./Monster";
import {Player} from "./Player";
import {Vec} from "~/code/game/game";

export class CopyCat extends Monster {

  get type() { return "copycat"; }

  update() {
    return Player.prototype.collide.apply(this, arguments);
  }
}