import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap'
import {
  GameDetail,
  GameStatus,
  GoalEvent,
  addGoalEventToGames,
  IGameDetail,
  updateGameDetail
} from '../../../common/models/games';
import Game from '../components/Game'
import * as api from '../services/scores'

function Scores() {

  // Replace this later
  const [games, setGames] = useState(Array<GameDetail>());

  function updateGames() {
    api.getGames().then(gameDetails => {
      setGames(gameDetails);
    })
  }

  useEffect(() => {
    updateGames();
  }, [])

  useEffect(() => {
    /* For handling Goal Events */
    const goalEventSource = new EventSource('/events/goal')

    const processData = (goalEvent: GoalEvent) => {
      setGames(addGoalEventToGames(goalEvent, games))
    }

    goalEventSource.onmessage = e => processData(JSON.parse(e.data))

    goalEventSource.onerror = (e) => {
      console.error(e);
      goalEventSource.close();
    }

    return () => {
      goalEventSource.close();
    };

  }, [games])

  useEffect(() => {
    /* For handling Goal Events */
    const es = new EventSource('/events/game')

    const processData = (gameDetail: IGameDetail) => {
      setGames(updateGameDetail(gameDetail, games));
    }

    es.onmessage = e => processData(JSON.parse(e.data))

    es.onerror = (e) => {
      console.error(e);
      es.close();
    }

    return () => {
      es.close();
    };

  }, [games])

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

  async function startGames() {
    await api.startGames();
    updateGames();
  }

  async function finishGames() {
     await api.finishGames();
     updateGames();
  }

  function totalGoals(): number {
    return games.reduce((accum, current) => {
      return accum + current.totalGoals;
    }, 0);
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