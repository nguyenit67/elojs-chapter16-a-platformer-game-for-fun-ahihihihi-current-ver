import "./game.css";
import {runGame} from "~/code/game/game";
import {DOMDisplay} from "~/code/display/DOMDisplay";
import {CanvasDisplay} from "~/code/display/CanvasDisplay";
import {State} from "~/code/game/State";
import {GAME_LEVELS} from "~/code/level_plans";

const levels = GAME_LEVELS.slice();
runGame(levels, CanvasDisplay);
