import { Controller, Get, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameDetail, GoalEvent, IGameDetail } from '../../../common/models/games';
import { GameService } from '../services/game.service';

@Controller()
export class GameEventController {
  constructor(private readonly gameService: GameService) {}

  @Sse('/events/game')
  gameEvent(): Observable<MessageEvent<IGameDetail>> {
    /* Creates a random goal event every 0 seconds,
    based on the games in json file*/
    return this.gameService.sendGameEvents();
  }

  @Sse('/events/goal')
  goalEvent(): Observable<MessageEvent<GoalEvent>> {
    /* Creates a random goal event every 0 seconds,
    based on the games in json file*/
    return this.gameService.sendGoalEvents();
  }

}