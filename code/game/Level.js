import {Player} from "~/code/actors/Player";
import {Lava} from "~/code/actors/Lava";
import {Coin} from "~/code/actors/Coin";
import {Monster} from "~/code/actors/Monster";
import {FrogMon} from "~/code/actors/FrogMon";
import {CopyCat} from "~/code/actors/CopyCat";
import {Vec} from "./game";

export const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  "o": Coin,
  "=": Lava,
  "|": Lava,
  "v": Lava,
  "M": Monster,
  "F": FrogMon,
  "C": CopyCat
};

export class Level {
  constructor(plan) {
    let matrix = plan.trim().split(/\r?\n/).map(l => Array.from(l));
    this.height = matrix.length;
    this.width = matrix[0].length;
    this.startActors = [];

    this.matrix = matrix.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type === "string") return type;
        this.startActors.push(
          type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }

  touches(pos, size, type) {
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);

    for (var y = yStart; y < yEnd; y++) {
      for (var x = xStart; x < xEnd; x++) {
        let isOutside = x < 0 || x >= this.width ||
                        y < 0 || y >= this.height;
        let here = isOutside ? "wall" : this.matrix[y][x];
        if (here == type) return true;
      }
    }
    return false;
  }
}