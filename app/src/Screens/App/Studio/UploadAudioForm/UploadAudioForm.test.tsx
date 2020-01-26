import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import UploadAudioForm from './UploadAudioForm'

describe('<UploadAudioForm />', () => {
  it('renders correctly', () => {
    render(<UploadAudioForm />)
  })

  test.todo('validates fields correctly')

  test.todo('should be able to pick thumbnail')

  test.todo('should display upload screen when user submit form')
})
