import firebase from 'react-native-firebase'
import { Dispatch } from 'redux'
import { Audio, AudioState, AUDIO_ACTIONS, AudioActions } from './types'

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

export const saveAudio = (uid: string, audio: Audio) => {
  return async (dispatch: Dispatch) => {
    try {
      const storageRef = firebase.storage().ref()
      const ref = storageRef.child(uid).child(res.name)
      await ref.putFile(res.uri).then(res => {
        console.warn(res.metadata.generation)
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}
