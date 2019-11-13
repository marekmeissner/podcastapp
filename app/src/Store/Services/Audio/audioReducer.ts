import firebase from 'react-native-firebase'
import { Dispatch } from 'redux'
import { AudioState, AUDIO_ACTIONS, AudioActions, Audio } from './types'

export const AudioInitialState: AudioState = {
  collection: [],
}

export const audioReducer = (state: AudioState = AudioInitialState, action: AudioActions) => {
  switch (action.type) {
    case AUDIO_ACTIONS.GET_COLLECTION:
      return {
        ...state,
        collection: [...state.collection, ...action.collection],
      }
    case AUDIO_ACTIONS.SAVE:
      return {
        ...state,
        collection: [action.audio, ...state.collection],
      }
  }
}

export const addAudio = (uid: string, data: Audio) => {
  return (dispatch: Dispatch) => {
    try {
    } catch (err) {
      throw new Error(err)
    }
  }
}
