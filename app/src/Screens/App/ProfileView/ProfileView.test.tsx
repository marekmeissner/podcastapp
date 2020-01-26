import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import ProfileView from './ProfileView'

describe('<ProfileView />', () => {
  it('renders correctly', () => {
    render(<ProfileView />)
  })

  test.todo('displays user informations')

  test.todo('shows user audios')

  test.todo('shows button to add audio when user has no audios')

  test.todo('shoud be able to edit description and avatar')

  test.todo('should change user avatar to settings icon on header')

  test.todo('should be able to go to settings')
})
