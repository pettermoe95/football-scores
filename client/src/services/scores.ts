import {
    GameDetail,
    gameDetailFromInterface,
    IGameDetail,
} from "../../../common/models/games";


const BASE_URL = '/api'

async function getGames(): Promise<Array<GameDetail>> {
  const response = await fetch(BASE_URL + '/games', {
    method: "GET",
  });
  const iGameDetails = await response.json() as Array<IGameDetail>
  // Mapping interface to class before returning
  return iGameDetails.map((el) => (
    gameDetailFromInterface(el)
  ))
}

async function startGames(): Promise<void> {
  await fetch(BASE_URL + '/games/start', {
    method: "POST",
  });
}

async function finishGames(): Promise<void> {
  await fetch(BASE_URL + '/games/finish', {
    method: "POST",
  });
}

export {
  getGames,
  startGames,
  finishGames,
}