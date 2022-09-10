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
    homeTeam: TeamScore
    awayTeam: TeamScore
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
        if(this.goals !== undefined) {
            return this.goals.length;
        }
        return 0
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

    constructor(id: number, status: GameStatus, minute: number, homeTeam: TeamScore, awayTeam: TeamScore) {
        this.id = id;
        this.status = status;
        this.minute = minute;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    get totalGoals(): number {
        return this.homeTeam.currentGoalsCount + this.awayTeam.currentGoalsCount;
    }
}

import { GoalEvent } from './events'

export {
    TeamScore,
    TeamSide,
    GameDetail,
    GameStatus,
}

export type {
    Team,
    IGameDetail,
    IScoreDetail,
    GoalEvent,
}