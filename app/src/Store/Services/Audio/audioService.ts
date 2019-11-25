import storage from '@react-native-firebase/storage'
import { DocumentPickerResponse } from 'react-native-document-picker'
import uuid from 'uuid'

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
        function error(err: { message: string }) {
          throw new Error(err.message)
        },
        function complete() {
          return call
        },
      )
    return call
  }

  static getDownloadUrl = async (ref: string) => {
    return await storage()
      .ref(ref)
      .getDownloadURL()
  }
}

export default AudioService
