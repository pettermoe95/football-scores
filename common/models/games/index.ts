enum TeamSide {
  HOME = 1,
  AWAY = 2
}

type Team = {
  id: number
  name: string
}

interface IScoreDetail {
  id: number
  scorer: string
  ts: string
}

interface ITeamScore {
  team: Team
  goals: Array<IScoreDetail>
}

interface IGameDetail {
  id: number
  status: GameStatus
  minute: number
  homeTeam: ITeamScore
  awayTeam: ITeamScore
}

class TeamScore implements ITeamScore {
  /* Needs extended functionality to give i.e. score computations */
  team: Team
  goals: IScoreDetail[] = []

  constructor(team: Team, goals: Array<IScoreDetail> = []) {
    this.team = team;
    this.goals = goals;
  }

  get currentGoalsCount(): number {
    return this.goals.length;
  }
}

enum GameStatus {
  NOT_STARTED = 1,
  ONGOING = 2,
  BREAK = 3,
  FINISHED = 4
}

class GameDetail implements IGameDetail {
  id: number
  status: GameStatus
  minute: number
  homeTeam: TeamScore
  awayTeam: TeamScore

  constructor(id: number, status: GameStatus,
    minute: number, homeTeam: TeamScore,
    awayTeam: TeamScore
  )
  {
    this.id = id;
    this.status = status;
    this.minute = minute;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  get totalGoals(): number {
    return this.homeTeam.currentGoalsCount +
    this.awayTeam.currentGoalsCount;
  }
}

function generateRandomGoal(
  games: Array<GameDetail>
): GoalEvent
{
  if(games.length == 0) throw Error('No games available');
  // Random home or away goal
  const side = Math.round(Math.random()) == 1 ?
  TeamSide.HOME : TeamSide.AWAY

  //Select a random index in the game list
  const gameIndex = Math.floor(Math.random() *games.length)

  // Select the gameId from index and use it as input for random game
  const gameId = games[gameIndex].id
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

function addGoalEventToGames(
  goal: GoalEvent,
  games: Array<GameDetail>
): Array<GameDetail>
{
  return games.map(game => {
    if(goal.gameId == game.id) {
      if(goal.side == TeamSide.HOME){
        game.homeTeam.goals.push(goal.scoreDetail);
      }
      else if(goal.side == TeamSide.AWAY){
        game.awayTeam.goals.push(goal.scoreDetail);
      }
    }
    return game
  })
}

function gameDetailFromInterface(
  iGameDetail: IGameDetail
): GameDetail
{
  return new GameDetail(
      iGameDetail.id,
      iGameDetail.status,
      iGameDetail.minute,
      new TeamScore(
        iGameDetail.homeTeam.team,
        iGameDetail.homeTeam.goals
      ),
      new TeamScore(
        iGameDetail.awayTeam.team,
        iGameDetail.awayTeam.goals
      )
  )
}

import { GoalEvent } from './events'

export {
  TeamScore,
  TeamSide,
  GameDetail,
  GameStatus,
  generateRandomGoal,
  addGoalEventToGames,
  gameDetailFromInterface
}

export type {
  Team,
  IGameDetail,
  IScoreDetail,
  GoalEvent,
}