const otherSprites = new Image();
otherSprites.src = "";
const playerXOverlap = 4;

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

  }
  drawActors(actors) {

  }
  
}