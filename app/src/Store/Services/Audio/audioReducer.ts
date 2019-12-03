import firestore from '@react-native-firebase/firestore'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { AudioState, AUDIO_ACTIONS, AudioActions, Audio, AudioSmall } from './types'
import { omit, merge, uniqBy } from 'lodash'
import AudioService from './audioService'
import { RootState } from '@service/rootReducer'
import {SavedAudio} from '@service/Auth/types'

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
        audios: merge(
          {},
          state.audios,
          state.audios.hasOwnProperty(action.uid)
            ? { [action.uid]: uniqBy([action.audio, ...state.audios[action.uid]], 'id') }
            : { [action.uid]: [action.audio] },
        ),
      }
    case AUDIO_ACTIONS.GET_SELECTED_AUDIOS:
      return {
        ...state,
        audios: merge({}, state.audios, action.audios),
      }
    case AUDIO_ACTIONS.INCREMENT_VIEWS:
      return {
        ...state,
        audios: {
          ...state.audios,
          [action.userId]: (state.audios[action.userId] as Audio[]).map(audio =>
            audio.id === action.audioId ? { ...audio, views: ++audio.views } : audio,
          ),
        },
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

export const getFollowingAudios = (uids: string[]) => {
  return async (dispatch: Dispatch) => {
    const audios: { [uid: string]: AudioSmall[] } = {}

    try {
      const audiosRef = firestore().collection('audios')
      const requests = await uids.map(uid => {
        return audiosRef
          .doc(uid)
          .collection('audio')
          .get()
          .then(querySnapshot => {
            audios[uid] = querySnapshot.docs.map(doc => doc.data() as AudioSmall) as []
          })
      })

      Promise.all(requests).then(() => {
        dispatch({ type: AUDIO_ACTIONS.GET_SELECTED_AUDIOS, audios })
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const getSavedAudios = (saved: SavedAudio[]) => {
  return async (dispatch: Dispatch) => {
    const audios: { [uid: string]: AudioSmall[] } = {}

    try {
      const audiosRef = firestore().collection('audios')
      const requests = await saved.map(savedAudio => {
        return audiosRef
          .doc(savedAudio.uid)
          .collection('audio')
          .get()
          .then(querySnapshot => {
            audios[savedAudio.uid] = audios[savedAudio.uid] ? [...audios[savedAudio.uid], querySnapshot.docs.find(doc => (doc.data() as AudioSmall).id === savedAudio.id )] : [querySnapshot.docs.find(doc => (doc.data() as AudioSmall).id === savedAudio.id )]
          })
      })

      Promise.all(requests).then(() => {
        dispatch({ type: AUDIO_ACTIONS.GET_SELECTED_AUDIOS, audios })
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const incrementAudioViews = (userId: string, audioId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await firestore()
        .doc(`audios/${userId}/audio/${audioId}`)
        .update({
          views: firestore.FieldValue.increment(1),
        })
      dispatch({ type: AUDIO_ACTIONS.INCREMENT_VIEWS, userId, audioId })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const selectAudiosCollection = (state: RootState) => state.audio.audios

export const selectFollowingIds = (state: RootState) => state.auth.user && state.auth.user.following

export const selectFollowingAudiosCollection = createSelector(
  selectAudiosCollection,
  selectFollowingIds,
  (audios, ids) => {
    const subscribedAudios: Audio[] = []
    ids && ids.map(function(key) {
      audios[key] && (audios[key] as Audio[]).map(audio => subscribedAudios.push(audio))
    })
    return subscribedAudios
  },
)

export const sortAudiosByTimeOfCreation = createSelector(selectFollowingAudiosCollection, audios => AudioService.sortAudiosByTimeOfCreation(audios))

const selectSavedAudios = (state: RootState) => state.auth.user && state.auth.user.saved

export const selectSavedAudiosCollection = createSelector(selectAudiosCollection, selectSavedAudios, (audios, saved) => {
  const savedAudios: Audio[] = []
  saved && saved.map(function(savedAudio) {
    audios[savedAudio.uid] && (audios[savedAudio.uid] as Audio[]).map(audio => audio.id === savedAudio.id && savedAudios.push({...audio, created: savedAudio.time}))
  })

  return savedAudios
})

export const sortSavedAudiosByTimeOfAdd = createSelector(selectSavedAudiosCollection, audios => AudioService.sortAudiosByTimeOfCreation(audios))

export const selectUsersAudios = (state: RootState) => state.audio.audios
