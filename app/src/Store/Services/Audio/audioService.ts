import firebase from 'react-native-firebase'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { UploadTaskSnapshot } from './types'
import uuid from 'uuid'

class AudioService {
  static saveFile = (uid: string, file: DocumentPickerResponse, callback?: Function) => {
    const storageRef = firebase.storage().ref()
    const ref = storageRef.child(uid).child(uuid())
    const call = ref.putFile(file.uri)
    callback &&
      call.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function progress(snapshot: UploadTaskSnapshot) {
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
}

export default AudioService
