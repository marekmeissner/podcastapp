import { PlayerState, PlayerActions, PLAYER_ACTIONS } from './types'
import { Dispatch } from 'redux'
import { RootState } from '../rootReducer'
import { AudioSmall } from '@service/Audio/types'

export const PlayerInitialState: PlayerState = {
  currentAudio: undefined
}

export const playerReducer = (state: PlayerState = PlayerInitialState, action: PlayerActions) => {
  switch (action.type) {
    case PLAYER_ACTIONS.SET_CURRENT_AUDIO:
      return {
        ...state,
        currentAudio: action.currentAudio
      }
    default:
      return state
  }
}

export const setCurrentAudio = (currentAudio: number) => {
  return (dispatch: Dispatch) => dispatch({type: PLAYER_ACTIONS.SET_CURRENT_AUDIO, currentAudio})
}

export const selectCurrentAudio = (state: RootState) => state.player.currentAudio

