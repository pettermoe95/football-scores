import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GoalEvent, IGameDetail } from '../../../common/models/games';
import { GameService } from '../services/game.service';

@Controller()
export class GameEventController {
  constructor(private readonly gameService: GameService) {}

  @Sse('/events/game')
  gameEvent(): Observable<MessageEvent<IGameDetail>> {
    return this.gameService.sendGameEvents();
  }

  @Sse('/events/goal')
  goalEvent(): Observable<MessageEvent<GoalEvent>> {
    return this.gameService.sendGoalEvents();
  }
}