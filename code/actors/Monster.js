import {Actor} from "./Actor";
import {Player} from "./Player";
import {Coin} from "./Coin";
import {Vec} from "~/code/game/game";
import {State} from "~/code/game/State";
import {EffectAdapter} from "~/code/display/DOM_effects";

export class Monster extends Actor {
  size = new Vec(1.2, 2);

  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() { return "monster"; }

  static create(pos) {
    return new Monster(pos.plus(new Vec(0, -1)),
                        new Vec(10, 0));
  }

  update(timeStep, state) {
    let newPos = this.pos.plus(this.speed.times(timeStep));
    
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Monster(newPos, this.speed);
    } else {
      return new Monster(this.pos, this.speed.times(-1));
    }
  }

  collide(state) {
    let {level, actors, effects, status} = state;
    let player = state.player;
    if (player.speed.y > 0) {
      actors = actors.map(actr =>  actr !== this ? actr : 
                            Coin.create(this.pos) );

      actors = actors.map(actr =>  actr !== player ? actr : 
                            new Player(player.pos, new Vec(player.speed.x, -9) ));
      effects.push(EffectAdapter.Monster.Dead
                      .create(this, state.level));
                
      
    } else {
      status = "lost";
    }
    return new State({level, actors, effects, status});
  }
}