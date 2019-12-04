import firestore from '@react-native-firebase/firestore'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { AudioState, AUDIO_ACTIONS, AudioActions, Audio } from './types'
import { merge, isEmpty } from 'lodash'
import AudioService from './audioService'
import { RootState } from '@service/rootReducer'
import { SavedAudio } from '@service/Auth/types'

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
        .set(data)
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const getFollowingAudios = (uids: string[]) => {
  return async (dispatch: Dispatch) => {
    const audios: { [uid: string]: Audio[] } = {}

    try {
      const audiosRef = firestore().collection('audios')
      const requests = await uids.map(uid => {
        return audiosRef
          .doc(uid)
          .collection('audio')
          .get()
          .then(querySnapshot => {
            audios[uid] = querySnapshot.docs.map(doc => doc.data() as Audio) as []
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
    const audios: { [uid: string]: Audio[] } = {}

    try {
      const audiosRef = firestore().collection('audios')
      const requests = await saved.map(savedAudio => {
        return audiosRef
          .doc(savedAudio.uid)
          .collection('audio')
          .get()
          .then(querySnapshot => {
            audios[savedAudio.uid] = merge(
              [],
              audios[savedAudio.uid],
              querySnapshot.docs.find(doc => (doc.data() as Audio).id === savedAudio.id),
            )
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
    ids &&
      ids.map(function(key) {
        audios[key] && (audios[key] as Audio[]).map(audio => subscribedAudios.push(audio))
      })
    return subscribedAudios
  },
)

export const sortAudiosByTimeOfCreation = createSelector(selectFollowingAudiosCollection, audios =>
  AudioService.sortAudiosByTimeOfCreation(audios),
)

const selectSortedSavedAudios = (state: RootState) =>
  state.auth.user && AudioService.sortAudiosByTimeOfSave(state.auth.user.saved)

export const selectSavedAudiosCollection = createSelector(
  selectAudiosCollection,
  selectSortedSavedAudios,
  (audios, saved) => {
    const savedAudios: Audio[] = []
    saved &&
      saved.map(function(savedAudio) {
        audios[savedAudio.uid] &&
          (audios[savedAudio.uid] as Audio[]).map(audio => audio.id === savedAudio.id && savedAudios.push(audio))
      })

    return savedAudios
  },
)

export const selectUsersAudios = (state: RootState) => state.audio.audios
