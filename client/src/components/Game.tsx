import { IGameDetail } from '../../../common/models/games'

function Game({id, homeTeam, awayTeam}: IGameDetail) {

  return (
    <div className="Game p-1">
      <span style={{width: '12rem', float: 'left', textAlign: 'left'}}>
        {homeTeam.team.name} vs {awayTeam.team.name}
      </span>
      <span style={{float: 'left'}}>
        {homeTeam.currentGoalsCount}:{awayTeam.currentGoalsCount}
      </span>
    </div>
  )
}

export default Game