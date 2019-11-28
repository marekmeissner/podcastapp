import firestore from '@react-native-firebase/firestore'
import { Dispatch } from 'redux'
import { AudioState, AUDIO_ACTIONS, AudioActions, Audio, AudioSmall } from './types'
import { omit, merge } from 'lodash'
import AudioService from './audioService'

export const AudioInitialState: AudioState = {
  collection: [],
  audios: {},
}

export const audioReducer = (state: AudioState = AudioInitialState, action: AudioActions) => {
  switch (action.type) {
    case AUDIO_ACTIONS.SAVE:
      return {
        ...state,
        collection: [action.audio, ...state.collection],
      }
    case AUDIO_ACTIONS.LOAD_AUDIO:
      return {
        ...state,
        history: merge({}, state.audios, { [action.uid]: action.audio }),
      }
    default:
      return state
  }
}

export const addAudio = (uid: string, data: Audio) => {
  return async () => {
    try {
      await firestore()
        .doc(`audios/${uid}/audio/${data.id}`)
        .set(omit(data, 'details'))
      await firestore()
        .doc(`audios/${uid}/audio/${data.id}/details/details`)
        .set(data.details)
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const getAudioDetails = (audioSmall: AudioSmall) => {
  return async (dispatch: Dispatch) => {
    try {
      const details = await firestore()
        .doc(`audios/${audioSmall.author.uid}/audio/${audioSmall.id}/details/details`)
        .get()
        .then(res => res.data())
      if (details) {
        const audioUrl = await AudioService.getDownloadUrl(details.audio)
        const thumbnailUrl = await AudioService.getDownloadUrl(audioSmall.thumbnail)

        const audio = {
          ...audioSmall,
          thumbnail: thumbnailUrl,
          details: {
            ...details,
            audio: audioUrl,
          },
        }

        dispatch({ type: AUDIO_ACTIONS.LOAD_AUDIO, uid: audioSmall.author.uid, audio })
        return audio
      }
      return undefined
    } catch (e) {
      throw new Error(e)
    }
  }
}
