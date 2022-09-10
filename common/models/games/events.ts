import { TeamSide, IScoreDetail} from '.'

type GoalEvent = {
    gameId: number
    side: TeamSide
    scoreDetail: IScoreDetail
}

export type {
    GoalEvent
}