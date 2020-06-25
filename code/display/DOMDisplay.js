import {Vec} from "~/code/game/game";

export const scale = 20;

function elt(tagName, attrs, ...children) {
  let dom = document.createElement(tagName);
  for(let name in attrs) {
    dom.setAttribute(name, attrs[name]);
  }
  dom.append(...children);
  // for(let child of children) dom.appendChild(child);
  return dom;
}

export class DOMDisplay {
  static elt = elt;
  static $ = (selector, context=document) => context.querySelector(selector);

  constructor(parent, level) {
    this.scene = drawGrid(level);
    this.dom = elt("div", {class: "game"}, this.scene);
    this.actorLayer = null;
    parent.appendChild(this.dom);
    this.effectLayer = elt("div");
    this.scene.appendChild(this.effectLayer);
  }
  clear() { this.dom.remove(); }

  syncState(state) {
    if (this.actorLayer != null) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.scene.appendChild(this.actorLayer);

    this.addEffects(state.effects);

    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  }

  scrollPlayerIntoView(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = new Vec(width / 3, height / 3);

    // The viewport
    let left = this.dom.scrollLeft;
    let right = left + width;
    let top = this.dom.scrollTop;
    let bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5))
                                 .times(scale);
    if (center.x < left + margin.x) {
      this.dom.scrollLeft = center.x - margin.x;
    } else if (center.x > right - margin.x) {
      this.dom.scrollLeft = center.x + margin.x - width;
    }

    if (center.y < top + margin.y) {
      this.dom.scrollTop = center.y - margin.y;
    } else if (center.y > bottom - margin.y) {
      this.dom.scrollTop = center.y + margin.y - height;
    }
  }

  addEffects(effects) {
    for(let effct of effects) {
      if (!effct.painted) {
        effct.painted = true;
        let effElem = elt("div", {class: `effect ${effct.type}`});
        this.effectLayer.appendChild(effElem);
        effct.draw(effElem);
      }
    }
  }
}

function drawGrid(level) {
  return elt("table", {
    "class": "background",
    style: `width: ${level.width * scale}px`
  }, ...level.matrix.map(row => 
    elt("tr", {style: `height: ${scale}px`},
        ...row.map(type => elt("td", {class: type})))
  ));
}

function drawActors(actors) {
  return elt("div", {}, ...actors.map(actor => {
    let rect = elt("div", {class: `actor ${actor.type}`});
    let {size, pos} = actor;
    rect.style.width = `${size.x * scale}px`;
    rect.style.height = `${size.y * scale}px`;
    rect.style.left = `${pos.x * scale}px`;
    rect.style.top = `${pos.y * scale}px`;
    return rect;
  }));
}


//add gamelog view
// import {Player} from "./actors";

// const xElt = elt("div");
// const yElt = elt("div");

// const gameLogElt = elt("div", { 
//     id: "gamelog", 
//     style: `
//       position: fixed; 
//       left: 0; 
//       bottom: 0;
//       font-weight: bold;
//       font-family: consolas;
//       font-size: 30px;
// `}, xElt, yElt );


// document.body.appendChild(gameLogElt);

// const originPlayerUpdate = Player.prototype.update;
// Player.prototype.update = function() {
//   try {
//     return originPlayerUpdate.apply(this, arguments);
//   } finally {    
//     let pos   = this.pos;
//     let speed = this.speed;
//     xElt.textContent = `X: ${speed.x.toFixed(5)}`;
//     yElt.textContent = `Y: ${speed.y.toFixed(5)}`;
//   }
// };