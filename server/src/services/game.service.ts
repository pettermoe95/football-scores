import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import {
  addGoalEventToGames,
  GameDetail,
  IGameDetail,
  GameStatus,
  generateRandomGoal,
  GoalEvent,
  gameDetailFromInterface
} from '../../../common/models/games';
import * as jsonGames from '../data/games.json';
import { deepCloneObj } from '../utils/'

const ONE_MINUTE_SCALE = 1000;
const GOAL_INTERVAL = 10; // in minutes
const MAX_GOALS = 9;
const MAX_MINUTES = 90;

@Injectable()
export class GameService {

  games = Array<GameDetail>();
  gameTimer: NodeJS.Timer;
  gamesMinutes = 0;

  private goalEvents = new Subject<MessageEvent<GoalEvent>>();
  private gameEvents = new Subject<MessageEvent<IGameDetail>>();

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
  
  sendGameEvents(): Observable<MessageEvent<IGameDetail>> {
    return this.gameEvents.asObservable();
  }

  sendGoalEvents(): Observable<MessageEvent<GoalEvent>> {
    return this.goalEvents.asObservable();
  }

  /**
   *    deep clone json list and assign it to
   *    this.games. Set game status to ongoing
   */
   startGames() {
    this.gamesMinutes = 0;
    const gamesClone = deepCloneObj<Array<IGameDetail>>(jsonGames);
    this.games = gamesClone.map(( game =>
      gameDetailFromInterface(game)
    ));
    this.startGamesTimer();
    this.games.map(game => game.status = GameStatus.ONGOING);
  }

  stopGames() {
    clearInterval(this.gameTimer);
    this.games.map(game => game.status = GameStatus.FINISHED)
    //games are stopped and needs to be updated
    this.addGameEvents();
  }

    /*
   *   Since there should be 10 random goals we generate 
   *   the missing goals and add them to games list.
   *   Finally we set gamestatus to finished.
   */
    finishGames(): Array<GameDetail> {
      this.stopGamesTimer()
  
      var goalsCount = this.totalGoals
  
      const goalsToAdd = () => {
        const goals: Array<GoalEvent> = []
        while(goalsCount < MAX_GOALS){
          goals.push(generateRandomGoal(this.games));
          goalsCount++
        }
        return goals
      }
      goalsToAdd().forEach(goal => {
        console.log('adding random goal to finish sim');
        this.addGoalToGamesList(goal);
      });
      
      this.stopGames();
      return this.games;
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
      //Minutes in games changed, reuires event
      this.addGameEvents();
      //Add a random goal for every 10 min
      this.checkForGoals();
      //IF 10 goals are reached timer should stop
      if(this.hasReachedMaxMinutes) this.stopGames();
    }, ONE_MINUTE_SCALE)
  }

  stopGamesTimer() {
    clearInterval(this.gameTimer);
  }

  checkForGoals() {
    if(
      this.gamesMinutes % GOAL_INTERVAL == 0 &&
      ! this.hasReachedMaxGoals
    ) {
      const newGoal = generateRandomGoal(this.games);
      this.addGoalToGamesList(newGoal);
    }
  }

  addGoalToGamesList(goal: GoalEvent) {
    this.games = addGoalEventToGames(goal, this.games);
    this.goalEvents.next({data: goal} as MessageEvent<GoalEvent>);
  }

  addGameEvents() {
    this.games.forEach(game => {
      this.gameEvents.next(
        {
          data: game as IGameDetail
        } as MessageEvent<IGameDetail>
      );
    })
  }
}
