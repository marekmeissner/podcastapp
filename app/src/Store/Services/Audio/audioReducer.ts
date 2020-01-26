import firestore from '@react-native-firebase/firestore'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import {
  AudioState,
  AUDIO_ACTIONS,
  AudioActions,
  Audio,
  GetAudiosSearchParams,
  AudioSave,
  GetSelectedAudios,
  IncrementAudioViews,
} from './types'
import { uniqBy } from 'lodash'
import AudioService from './audioService'
import { RootState } from '@service/rootReducer'
import { SavedAudio } from '@service/Auth/types'

export const AudioInitialState: AudioState = {
  audios: [],
}

export const audioReducer = (state: AudioState = AudioInitialState, action: AudioActions) => {
  switch (action.type) {
    case AUDIO_ACTIONS.SAVE:
      return {
        ...state,
        audios: uniqBy([...state.audios, action.audio], 'id'),
      }
    case AUDIO_ACTIONS.GET_SELECTED_AUDIOS:
      return {
        ...state,
        audios: uniqBy([...state.audios, ...action.audios], 'id'),
      }
    case AUDIO_ACTIONS.INCREMENT_VIEWS:
      return {
        ...state,
        audios: state.audios.map(audio => (audio.id === action.audioId ? { ...audio, views: ++audio.views } : audio)),
      }
    default:
      return state
  }
}

export const getAudiosSearch = ({ limit, searchPhrase, orderBy }: GetAudiosSearchParams = {}) => {
  return async (dispatch: Dispatch<GetSelectedAudios>) => {
    let audios: Audio[] = []

    searchPhrase &&
      (await firestore()
        .collection('audios')
        .orderBy(orderBy || 'title')
        .startAt(searchPhrase.toLowerCase())
        .limit(limit || 5)
        .get()
        .then(querySnapshot => {
          audios = uniqBy([...audios, ...querySnapshot.docs.map(doc => doc.data() as Audio)], 'id')
        }))

    dispatch({ type: AUDIO_ACTIONS.GET_SELECTED_AUDIOS, audios })
  }
}

export const getUserAudios = (uid: string) => {
  return async (dispatch: Dispatch<GetSelectedAudios>) => {
    try {
      let audios: Audio[] = []

      await firestore()
        .collection('audios')
        .where('uid', '==', uid)
        .get()
        .then(querySnapshot => {
          audios = uniqBy([...audios, ...querySnapshot.docs.map(doc => doc.data() as Audio)], 'id')
        })

      dispatch({ type: AUDIO_ACTIONS.GET_SELECTED_AUDIOS, audios })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const addAudio = (audio: Audio) => {
  return async (dispatch: Dispatch<AudioSave>) => {
    try {
      await firestore()
        .doc(`audios/${audio.id}`)
        .set(audio)

      dispatch({ type: AUDIO_ACTIONS.SAVE, audio })
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const getFollowingAudios = (uids: string[]) => {
  return async (dispatch: Dispatch<GetSelectedAudios>) => {
    let audios: Audio[] = []

    try {
      const audiosRef = firestore().collection('audios')
      const requests = await uids.map(uid => {
        return audiosRef
          .where('uid', '==', uid)
          .get()
          .then(querySnapshot => {
            audios = uniqBy([...audios, ...querySnapshot.docs.map(doc => doc.data() as Audio)], 'id')
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
  return async (dispatch: Dispatch<GetSelectedAudios>) => {
    let audios: Audio[] = []

    try {
      const audiosRef = firestore().collection('audios')
      const requests = await saved.map(savedAudio => {
        return audiosRef
          .where('id', '==', savedAudio.id)
          .get()
          .then(querySnapshot => {
            audios = uniqBy([...audios, ...querySnapshot.docs.map(doc => doc.data() as Audio)], 'id')
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
  return async (dispatch: Dispatch<IncrementAudioViews>) => {
    try {
      await firestore()
        .doc(`audios/${audioId}`)
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
        audios.map(audio => audio.uid === key && subscribedAudios.push(audio))
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
        audios.map(audio => audio.id === savedAudio.id && savedAudios.push(audio))
      })

    return savedAudios
  },
)

export const selectUserAudios = createSelector(
  selectAudiosCollection,
  (_: any, uid: string) => uid,
  (audios, uid) => {
    const audiosCollection = audios.filter(audio => audio.uid === uid)
    return AudioService.sortAudiosByTimeOfCreation(audiosCollection)
  },
)

export const selectUsersAudios = (state: RootState) => state.audio.audios

export const filterAudiosByQuery = (audios: Audio[], query: string) => {
  query = query.toLowerCase()
  return audios.filter(({ title }) => title.toLowerCase().startsWith(query))
}

export const filterAudiosByPhrasePresence = (audios: Audio[], phrase: string) => {
  phrase = phrase.toLowerCase()
  return audios.filter(({ title }) => title.toLowerCase().includes(phrase))
}
