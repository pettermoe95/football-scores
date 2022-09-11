import { Module } from '@nestjs/common';
import { GameEventController } from 'controllers/game.event.controller';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';

@Module({
  imports: [],
  controllers: [GameController, GameEventController],
  providers: [GameService],
})
export class AppModule {}
