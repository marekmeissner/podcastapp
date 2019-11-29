import firestore from '@react-native-firebase/firestore'
import { Dispatch } from 'redux'
import { SubscribeState, SUBSCRIBE_ACTIONS, SubscribeActions } from './types'
import { AudioSmall } from '@service/Audio/types'
import { RootState } from '@service/rootReducer'
import { createSelector } from 'reselect'

export const SubscribeInitialState: SubscribeState = {
  collection: [],
}

export const subscribeReducer = (
  state: SubscribeState = SubscribeInitialState,
  action: SubscribeActions,
): SubscribeState => {
  switch (action.type) {
    case SUBSCRIBE_ACTIONS.GET_COLLECTION:
      return {
        ...state,
        collection: [...action.collection],
      }
    default:
      return state
  }
}

export const getSubscribedAudios = (uids: string[]) => {
  return async (dispatch: Dispatch) => {
    const collection: AudioSmall[] = []
    try {
      const audiosRef = firestore().collection('audios')
      const requests = await uids.map(uid => {
        return audiosRef
          .doc(uid)
          .collection('audio')
          .get()
          .then(querySnapshot => {
            return querySnapshot.forEach(doc => {
              collection.push(doc.data() as AudioSmall)
            })
          })
      })
      Promise.all(requests).then(() => {
        dispatch({ type: SUBSCRIBE_ACTIONS.GET_COLLECTION, collection })
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const selectSubscribedAudiosCollection = (state: RootState) => state.subscribe.collection

export const sortAudiosByTimeOfCreation = createSelector(selectSubscribedAudiosCollection, audios => {
  return audios.sort(function(a: AudioSmall, b: AudioSmall) {
    return new Date(b.created) - new Date(a.created)
  })
})
