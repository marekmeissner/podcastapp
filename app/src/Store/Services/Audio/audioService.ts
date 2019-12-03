import storage from '@react-native-firebase/storage'
import { DocumentPickerResponse } from 'react-native-document-picker'
import uuid from 'uuid'
import {AudioSmall} from './types'

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

  static sortAudiosByTimeOfCreation = (audios: AudioSmall[]) => {
    return audios.sort ? audios.sort(function(a: AudioSmall, b: AudioSmall) {
      return new Date(b.created) - new Date(a.created)
    }) : []
  }
}

export default AudioService
