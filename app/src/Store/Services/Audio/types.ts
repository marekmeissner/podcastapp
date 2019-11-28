export enum AUDIO_ACTIONS {
  SAVE = 'AUDIO_SAVE',
  LOAD_AUDIO = 'LOAD_USER_AUDIO',
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

export type AudioSmall = Omit<Audio, 'details'>

export interface AddNewAudio {
  title: string
  description: string
  ratings: boolean
  donations: boolean
}

export interface AudioSave {
  type: AUDIO_ACTIONS.SAVE
  audio: Audio
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

export type AudioActions = LoadUserAudio | AudioSave
