import { Button, Card, Container } from 'react-bootstrap'

function Scores() {

  function gameOngoing(): boolean {
    return true;
  }

  function startGames() {
    console.log('Starting games!')
  }

  function finishGames() {
    console.log('Starting games!')
  }

  function totalGoals(): number {
    return 0;
  }

  return (
    <Container style={{display: 'flex', justifyContent: 'center'}}>
      <Card className="p-2 pb-0" style={{width: '20rem', textAlign: 'center', marginTop: '10rem', borderRadius: '5px'}}>
        <Card.Body className="d-flex flex-column">
          
          {
            !gameOngoing() &&
            <Button
              className='mb-3'
              variant="outline-dark"
              size='sm'
              style={{width: '6rem', margin: '0 auto'}}
              onClick={() => startGames()}
            >
              Start
            </Button>
          }
          {
            gameOngoing() &&
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
          
          <div className="Game p-1">
            <span style={{width: '12rem', float: 'left', textAlign: 'left'}}>
              Germany vs Poland
            </span>
            <span style={{float: 'left'}}>
              0:0
            </span>
          </div>
          <div className="Game p-1">
            <span style={{width: '12rem', float: 'left', textAlign: 'left'}}>
              Brazil vs Mexico
            </span>
            <span style={{float: 'left'}}>
              0:0
            </span>
          </div>
          <div className="Game p-1">
            <span style={{width: '12rem', float: 'left', textAlign: 'left'}}>
              Argentina vs Uruguay
            </span>
            <span style={{float: 'left'}}>
              0:0
            </span>
          </div>
          <span className="pt-3" style={{textAlign: 'right'}}>
            Total goals: {totalGoals()}
          </span>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Scores