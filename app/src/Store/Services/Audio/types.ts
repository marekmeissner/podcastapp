export enum AUDIO_ACTIONS {
  SAVE = 'AUDIO_SAVE',
  LOAD_AUDIO = 'LOAD_USER_AUDIO',
  GET_SELECTED_AUDIOS = 'GET_SELECTED_AUDIOS_COLLECTION',
  INCREMENT_VIEWS = 'INCREMENT_AUDIO_VIEWS',
  LOAD_USER_AUDIOS = 'LOAD_USER_AUDIOS_COLLECTION'
}

export interface AudioState {
  readonly collection: Audio[]
  readonly audios: {
    [uid: string]: Audio[]
  }
}

export interface Audio {
  id: string
  thumbnail: string
  title: string
  author: {
    name: string
    uid: string
  }
  views: number
  created: string
  details: {
    description: string
    ratings: boolean
    donations: boolean
    audio: string
  }
}

export interface AddNewAudio {
  title: string
  description: string
  ratings: boolean
  donations: boolean
  thumbnail: { uri: string; size: number }
}

export interface AudioSave {
  type: AUDIO_ACTIONS.SAVE
  audio: Audio
}

export interface LoadUserAudiosCollection {
  type: AUDIO_ACTIONS.LOAD_USER_AUDIOS
  audios: Audio[]
}
export interface UploadTaskSnapshot {
  bytesTransferred: number
  totalBytes: number
}

export interface LoadUserAudio {
  type: AUDIO_ACTIONS.LOAD_AUDIO
  uid: string
  audio: Audio
}

export interface GetSelectedAudios {
  type: AUDIO_ACTIONS.GET_SELECTED_AUDIOS
  audios: {
    [uid: string]: Audio[]
  }
}

export interface IncrementAudioViews {
  type: AUDIO_ACTIONS.INCREMENT_VIEWS
  userId: string
  audioId: string
}

export type AudioActions = LoadUserAudio | AudioSave | GetSelectedAudios | IncrementAudioViews | LoadUserAudiosCollection
