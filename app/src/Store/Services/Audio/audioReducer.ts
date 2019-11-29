import firestore from '@react-native-firebase/firestore'
import { Dispatch } from 'redux'
import {createSelector} from 'reselect'
import { AudioState, AUDIO_ACTIONS, AudioActions, Audio, AudioSmall } from './types'
import { omit, merge, uniqBy } from 'lodash'
import AudioService from './audioService'
import { RootState } from '@service/rootReducer'

export const AudioInitialState: AudioState = {
  collection: [],
  subscribedIds: [],
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
    case AUDIO_ACTIONS.SET_SUBSCRIBED_IDS:
      return {
        ...state,
        subscribedIds: merge([], state.subscribedIds, action.uids)
      }
    case AUDIO_ACTIONS.GET_SUBSCRIBED_AUDIOS: 
    return {
      ...state,
      audios: action.audios
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
      if (details ) {
        const audioUrl = !details.audio.includes('http') && await AudioService.getDownloadUrl(details.audio)
        const thumbnailUrl = !audioSmall.thumbnail.includes('http') && await AudioService.getDownloadUrl(audioSmall.thumbnail)

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

export const getSubscribedAudios = (uids: string[]) => {
  return async (dispatch: Dispatch) => {
    const audios: {[uid: string]: AudioSmall[]} = {}

    try {
      const audiosRef = firestore().collection('audios')
      const requests = await uids.map(uid => {
        return audiosRef
          .doc(uid)
          .collection('audio')
          .get()
          .then(querySnapshot => {
            return querySnapshot.forEach(doc => {
              audios[uid] = audios[uid] ? [...audios[uid], (doc.data() as AudioSmall)] : [(doc.data() as AudioSmall)];
            })
          })
      })
      Promise.all(requests).then(() => {
        dispatch({ type: AUDIO_ACTIONS.GET_SUBSCRIBED_AUDIOS, audios })
        dispatch({ type: AUDIO_ACTIONS.SET_SUBSCRIBED_IDS, uids})
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const selectAudiosCollection = (state: RootState) => state.audio.audios

export const selectSubscribedIds = (state: RootState) => state.audio.subscribedIds

export const selectSubscribedAudiosCollection = createSelector(selectAudiosCollection, selectSubscribedIds, (audios, ids) => {
  const subscribedAudios: Audio[] = []
  ids.map(function(key) {
    audios[key] && (audios[key] as AudioSmall[]).map(audio => subscribedAudios.push(audio))
  });

  return subscribedAudios
})

export const sortAudiosByTimeOfCreation = createSelector(selectSubscribedAudiosCollection, audios => {
  return audios.sort(function(a: AudioSmall, b: AudioSmall) {
    return new Date(b.created) - new Date(a.created)
  })
})

export const selectUsersAudios = (state: RootState) => state.audio.audios
