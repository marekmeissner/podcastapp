export enum AUDIO_ACTIONS {
  SAVE = 'AUDIO_SAVE',
  LOAD_AUDIO = 'LOAD_USER_AUDIO',
  GET_SUBSCRIBED_AUDIOS = 'GET_SUBSCRIBED_AUDIOS_COLLECTION',
  INCREMENT_VIEWS = 'INCREMENT_AUDIO_VIEWS',
}

export interface AudioState {
  readonly collection: Audio[]
  readonly audios: {
    [uid: string]: Audio[] | AudioSmall[]
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

export interface GetSubscribedAudios {
  type: AUDIO_ACTIONS.GET_SUBSCRIBED_AUDIOS
  audios: {
    [uid: string]: AudioSmall[]
  }
}

export interface IncrementAudioViews {
  type: AUDIO_ACTIONS.INCREMENT_VIEWS
  userId: string
  audioId: string
}

export type AudioActions = LoadUserAudio | AudioSave | GetSubscribedAudios | IncrementAudioViews
