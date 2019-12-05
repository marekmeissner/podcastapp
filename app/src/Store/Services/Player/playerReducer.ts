import { PlayerState, PlayerActions, PLAYER_ACTIONS } from './types'
import { Dispatch } from 'redux'
import { RootState } from '../rootReducer'
import { Audio } from '@service/Audio/types'

export const PlayerInitialState: PlayerState = {
  currentAudio: undefined,
  playerTrack: [],
}

export const playerReducer = (state: PlayerState = PlayerInitialState, action: PlayerActions) => {
  switch (action.type) {
    case PLAYER_ACTIONS.SET_CURRENT_AUDIO:
      return {
        ...state,
        currentAudio: action.currentAudio,
      }
    case PLAYER_ACTIONS.SET_PLAYER_TRACK:
      return {
        ...state,
        playerTrack: action.playerTrack,
      }
    default:
      return state
  }
}

export const setCurrentAudio = (currentAudio: number) => {
  return (dispatch: Dispatch) => dispatch({ type: PLAYER_ACTIONS.SET_CURRENT_AUDIO, currentAudio })
}

export const setPlayerTrack = (playerTrack: Audio[]) => {
  return (dispatch: Dispatch) => dispatch({ type: PLAYER_ACTIONS.SET_PLAYER_TRACK, playerTrack })
}

export const selectCurrentAudio = (state: RootState) => state.player.currentAudio

export const selectPlayerTrack = (state: RootState) => state.player.playerTrack
