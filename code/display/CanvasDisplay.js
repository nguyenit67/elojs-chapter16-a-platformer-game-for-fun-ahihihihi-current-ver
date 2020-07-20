const otherSprites = new Image();
otherSprites.src = "";

function flipHorizontally(context, xAxis) {
  context.translate(xAxis, 0);
  context.scale(-1, 1);
  context.translate(-xAxis, 0);
}

export class CanvasDisplay {
  constructor(parent, level)  {
    this.canvas = document.createElement("canvas");
    this.canvas.width = Math.min(600, level.width * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");
    this.flipPlayer = false;

    this.viewport = {
      left: 0,
      top: 0,
      width: this.canvas.width / scale,
      height: this.canvas.height / scale
    }
  }

  clear() {
    this.canvas.remove();
  }

  syncState(state) {
    this.updateViewport(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
  }

  updateViewport(state) {
    let vp = this.viewport, margin = view.width / 3;
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5));

    if (center.x < vp.left + margin) {
      vp.left = Math.max(center.x - margin, 0);
    } else (center.x > vp.left + vp.width - margin) {
      vp.left = Math.min( center.x + margin,
                          state.level.width  ) - 
                vp.width;
    }
    if (center.y < vp.top + margin) {
      vp.top = Math.max(center.y - margin, 0);
    } else (center.y > vp.top + vp.height - margin) {
      vp.top = Math.min( center.y + margin,
                          state.level.height  ) - 
                vp.height;
    }
  }
  clearDisplay(status) {
    if (status == "won") {
      this.cx.fillStyle = "rgb(68, 191, 255)";
    } else if (status == "lost") {
      this.cx.fillStyle = "rgb(44, 136, 214)";
    } else {
      this.cx.fillStyle = "rgb(52, 166, 251)";
    }
    this.cx.fillRect(0, 0,
                    this.canvas.width, this.canvas.height);
  }
  drawBackground(level) {
    let {left, top, width, height} = this.viewport;
    let xStart = Math.floor(left);
    let xEnd = Math.ceil(left + width);
    let yStart = Math.floor(top);
    let yEnd = Math.ceil(top + height);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let tile = level.matrix[y][x];
        if (tile === "empty") continue;
        let screenX = (x - left) * scale;
        let screenY = (y - top ) * scale;
        let tileX   = tile === "lava" ? scale : 0;
        this.cx.drawImage(otherSprites,
                          tileX,         0, scale, scale, 
                          screenX, screenY, scale, scale);
      }
    } 
  }
  drawPlayer(player, x, y, width, height) {
    const playerXOverlap = 4;
    width += playerXOverlap * 2;
    x -= playerXOverlap;
    if (player.speed.x !== 0) {
      this.flipPlayer = player.speed.x < 0;
    }
    let tile = 8;
    if (player.speed.y !== 0) {
      tile = 9;
    } else if (player.speed.x !== 0) {
      tile = Math.floor(Date.now() / 60) % 8;
    }

    this.cx.save();
    if (this.flipPlayer) {
      flipHorizontally(this.cx, x + width / 2)
    }
    let tileX = tile * width;
    this.cx.drawImage(playerSprite, 
                      tileX, 0, width, height,
                      x,     y, width, height);
    this.cx.restore();
  }
  drawActors(actorList) {
    for(const actor of actorList) {
      let x = (actor.pos.x - this.viewport.left)  * scale;
      let y = (actor.pos.y - this.viewport.top) * scale;
      let width = actor.size.x * scale;
      let height = actor.size.y * scale;

      if (actor.type === "player") {
        this.drawPlayer(actor, x, y, width, height);
      } else {
        let tileX = actor.type === "coin" ? 2 : 1;
        this.cx.drawImage(otherSprites, 
                          tileX, 0, width, height, 
                          x,     y, width, height);
      }
    }
  }
  
}