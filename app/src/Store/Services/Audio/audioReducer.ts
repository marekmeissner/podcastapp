import firebase from 'react-native-firebase'
import { Dispatch } from 'redux'
import { AudioState, AUDIO_ACTIONS, AudioActions, Audio } from './types'
import { omit } from 'lodash'

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
  return async (dispatch: Dispatch) => {
    try {
      await firebase
        .firestore()
        .doc(`audios/${uid}/audio/${data.id}`)
        .set(omit(data, 'details'))
      await firebase
        .firestore()
        .doc(`audios/${uid}/audio/${data.id}/details/details`)
        .set(data.details)
    } catch (err) {
      throw new Error(err)
    }
  }
}
