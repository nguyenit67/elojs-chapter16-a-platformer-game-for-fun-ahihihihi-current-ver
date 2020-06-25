import "./game.css";
import {runGame} from "~/code/game/game";
import {DOMDisplay} from "~/code/display/DOMDisplay";
import {State} from "~/code/game/State";
import {GAME_LEVELS} from "~/code/level_plans";

runGame(GAME_LEVELS, DOMDisplay);
