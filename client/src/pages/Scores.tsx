import { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap'
import { GameDetail, TeamScore, GameStatus } from '../../../common/models/games';
import Game from '../components/Game'
import jsonGames from '../data/games.json'

function Scores() {

  // Replace this later
  const [games, setGames] = useState(jsonGames.map(game => new GameDetail(
    game.id,
    game.status,
    game.minute,
    new TeamScore(game.homeTeam.team, game.homeTeam.goals),
    new TeamScore(game.awayTeam.team, game.awayTeam.goals),
  )));

  function gamesStatus(): GameStatus {
    if(games.some(game => game.status == GameStatus.ONGOING)){
      return GameStatus.ONGOING;
    }
    if(games.every(game => game.status == GameStatus.NOT_STARTED)){
      return GameStatus.NOT_STARTED;
    }
    if(games.every(game => game.status == GameStatus.FINISHED)){
      return GameStatus.FINISHED;
    }
    return GameStatus.BREAK;
  }

  function setGamesStatus(status: GameStatus) {
    setGames(games.map(game => {
      game.status = status;
      return game;
    }))
  }

  function startGames() {
    setGamesStatus(GameStatus.ONGOING);
  }

  function finishGames() {
    setGamesStatus(GameStatus.FINISHED);
  }

  function totalGoals(): number {
    return 0;
  }

  return (
    <Container style={{display: 'flex', justifyContent: 'center'}}>
      <Card className="p-2 pb-0" style={{width: '20rem', textAlign: 'center', marginTop: '10rem', borderRadius: '5px'}}>
        <Card.Body className="d-flex flex-column">
          
          {
            [GameStatus.NOT_STARTED, GameStatus.FINISHED].includes(gamesStatus()) &&
            <Button
              className='mb-3'
              variant="outline-dark"
              size='sm'
              style={{width: '6rem', margin: '0 auto'}}
              onClick={() => startGames()}
            >
              {gamesStatus() == GameStatus.NOT_STARTED ? 'Start' : 'Restart'}
            </Button>
          }
          {
            gamesStatus() == GameStatus.ONGOING &&
            <Button
              className='mb-3'
              variant="outline-dark"
              size='sm'
              style={{width: '6rem', margin: '0 auto'}}
              onClick={() => finishGames()}
            >
              Finish
            </Button>
          }
          
          {games.map(game => (
            <Game key={game.id} {...game}/>
          ))}

          <span className="pt-3" style={{textAlign: 'right'}}>
            Total goals: {totalGoals()}
          </span>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Scores