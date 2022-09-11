import { Controller, Get, Post } from '@nestjs/common';
import { GameDetail } from '../../../common/models/games';
import { GameService } from '../services/game.service';

@Controller('/api')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/games')
  getGames(): Array<GameDetail> {
    return this.gameService.games;
  }

  @Get('/games/start')
  startGames(): Array<GameDetail> {
    this.gameService.startGames();
    return this.gameService.games;
  }
}
