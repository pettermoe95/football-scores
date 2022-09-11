import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from '../controllers/game.controller';
import { GameService } from '../services/game.service';
import * as jsonGames from '../data/games.json';
import { GameStatus } from '../../../common/models/games';

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();

    gameController = app.get<GameController>(GameController);
    gameService = app.get<GameService>(GameService);
  });

  describe('games', () => {
    it('should return initial game values from json file', () => {
      expect(gameController.getGames()).toStrictEqual(JSON.parse(JSON.stringify(jsonGames)));
    });
  });

});
