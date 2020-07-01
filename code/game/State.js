import {Player} from "~/code/actors/Player";

export class State {
  constructor({level, actors, effects, status}) {
    this.level = level;
    this.actors = actors;
    this.status = status;
    this.effects = effects;
    
    if (effects == null) {
      throw new Error("wtf?! well excuse me?");
    }    
  }

  static start(level) {
    return new State({level, 
                    actors : level.startActors, 
                    effects: [], 
                    status :  "playing"});
  }

  get player() {
    return this.actors.find(a => (a.type === "player"));
  }

  update(time, keys) {
    let actors = this.actors
      .map(actor => actor.update(time, this, keys));

    let effects = this.effects;
    //   .map(effct => effct.update(time, this, keys));
    let newState = new State({level: this.level, 
                              actors, 
                              effects,
                              status: this.status});

    if (newState.status !== "playing") return newState;

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State({level: this.level, 
                        actors,
                        effects, 
                        status: "lost"});
    }

    for (let actor of actors) {
      if (actor !== player && State.overlap(actor, player)) {
        newState = actor.collide(newState);
      }      
    }
    return newState;
  }
  
  static overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y;
  }
};

