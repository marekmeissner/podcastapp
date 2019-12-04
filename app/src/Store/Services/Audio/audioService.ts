import storage from '@react-native-firebase/storage'
import { DocumentPickerResponse } from 'react-native-document-picker'
import uuid from 'uuid'
import { Audio } from './types'
import { SavedAudio } from '@service/Auth/types'

class AudioService {
  static saveFile = (uid: string, file: DocumentPickerResponse, callback?: Function) => {
    const storageRef = storage().ref()
    const ref = storageRef.child(uid).child(uuid())
    const call = ref.putFile(file.uri)
    callback &&
      call.on(
        storage.TaskEvent.STATE_CHANGED,
        function progress(snapshot) {
          callback(snapshot)
        },
        function complete() {
          return call
        },
      )
    return call
  }

  static getDownloadUrl = async (ref: string) => {
    try {
      return await storage()
        .ref(ref)
        .getDownloadURL()
    } catch (e) {
      throw new Error(e)
    }
  }

  static sortAudiosByTimeOfCreation = (audios: Audio[]) => {
    return audios.sort
      ? audios.sort(function(a: Audio, b: Audio) {
          return new Date(b.created) - new Date(a.created)
        })
      : []
  }

  static sortAudiosByTimeOfSave = (audios: SavedAudio[]) => {
    return audios.sort
      ? audios.sort(function(a: SavedAudio, b: SavedAudio) {
          return new Date(b.time) - new Date(a.time)
        })
      : []
  }
}

export default AudioService
