import {scale} from "./DOMDisplay";

export class EffectAdapter {
  static Monster = class {
    static Dead = class {
      constructor(actor) {
        this.actor = actor;
        this.painted = false;
      }
      static create(actor, level) {
        let _this = new EffectAdapter.Monster.Dead(actor);
        _this.bottom = level.height - (actor.pos.y + actor.size.y);
        return _this;
      }
      get type() { return "monster monster-dead"};

      draw(effElem) {
        let {size, pos} = this.actor;
        let {style} = effElem;
        style.transition = "all 0.5s ease-in-out";
        style.width = `${size.x * scale}px`;
        style.height = `${size.y * scale}px`;
        style.left = `${pos.x * scale}px`;
        style.bottom = `${this.bottom * scale}px`;

        setTimeout(() => {
          console.log("weeeeeeeeeee");
          style.transform = `rotate(${1170}deg)`;
          style.bottom = `${-9}em`;
        }, 0);
      }
    }  
  }
}