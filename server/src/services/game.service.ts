import { Injectable } from '@nestjs/common';
import {
  addGoalEventToGames,
  GameDetail,
  IGameDetail,
  GameStatus,
  generateRandomGoal,
  GoalEvent,
  TeamScore,
  TeamSide,
  gameDetailFromInterface
} from '../../../common/models/games';
import * as jsonGames from '../data/games.json';
import { deepCloneObj } from '../utils/'

const ONE_MINUTE_SCALE = 100;
const GOAL_INTERVAL = 10; // in minutes
const MAX_GOALS = 9;
const MAX_MINUTES = 90;

@Injectable()
export class GameService {

  games = Array<GameDetail>();
  gameTimer: NodeJS.Timer;
  gamesMinutes = 0;

  constructor() {
    this.games = JSON.parse(JSON.stringify(jsonGames))
  }

  get totalGoals(): number {
    return this.games.reduce((accum, current) => {
      return accum + current.totalGoals;
    }, 0);
  }

  get hasReachedMaxGoals(): boolean {
    return this.totalGoals >= MAX_GOALS;
  }

  get hasReachedMaxMinutes(): boolean {
    return this.gamesMinutes >= MAX_MINUTES;
  }

  /**
   *    deep clone json list and assign it to
   *    this.games. Set game status to ongoing
   */
   startGames() {
    const gamesClone = deepCloneObj<Array<IGameDetail>>(jsonGames);
    this.games = gamesClone.map(( game =>
      gameDetailFromInterface(game)
    ));
    this.startGamesTimer();
  }

  stopGames() {
    clearInterval(this.gameTimer);
    this.games = this.games.map(game => {
      game.status = GameStatus.FINISHED;
      return game;
    })
  }

  /**
   * Starts an interval for the games,
   */
  startGamesTimer() {
    clearInterval(this.gameTimer);
    this.gameTimer = setInterval(() => {
      //Increment the game minutes by one minute
      this.gamesMinutes += 1;
      // Add new minutes to games, #real minutes
      this.games.map(game => {
        game.minute = this.gamesMinutes
      })
      console.log(this.games[0].minute);
      //Add a random goal for every 10 min
      if(
        this.gamesMinutes % GOAL_INTERVAL == 0 &&
        ! this.hasReachedMaxGoals
      ) {
        this.addRandomGoal();
      }
      //IF 10 goals are reached timer should stop
      if(this.hasReachedMaxMinutes) this.stopGames();
    }, ONE_MINUTE_SCALE)
  }

  addRandomGoal() {
    const newGoal = generateRandomGoal(this.games);
    this.games = addGoalEventToGames(newGoal, this.games);
  }

}
