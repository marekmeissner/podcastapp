import { User } from '@service/Auth/types'

const mockUser: User = {
  uid: '12345',
  email: 'marek@test.com',
  accountName: 'Mareczek',
  description: 'Description',
  avatar: '',
  following: [],
  followers: 0,
  saved: [],
}

export { mockUser }
