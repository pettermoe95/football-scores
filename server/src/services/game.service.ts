import { Injectable } from '@nestjs/common';
import { GameDetail, GoalEvent, TeamSide } from '../../../common/models/games';
import * as jsonGames from '../data/games.json';

@Injectable()
export class GameService {

  private games = Array<GameDetail>()

  constructor() {
    this.games = JSON.parse(JSON.stringify(jsonGames))
  }

  public getGames(): Array<GameDetail> {
    return this.games
  }

  generateRandomGoal(): GoalEvent {
    if(this.games.length == 0) throw Error('No games available');
    // Random home or away goal
    const side = Math.round(Math.random()) == 1 ? TeamSide.HOME : TeamSide.AWAY

    //Select a random index in the game list
    const gameIndex = Math.floor(Math.random() * this.games.length)

    // Select the gameId from index and use it as input for random game
    const gameId = this.games[gameIndex].id
    return {
      gameId,
      side,
      scoreDetail: {
        id: 1,
        scorer: 'Erling Braut Haaland',
        ts: "10:00"
      }
    }
  }

}
