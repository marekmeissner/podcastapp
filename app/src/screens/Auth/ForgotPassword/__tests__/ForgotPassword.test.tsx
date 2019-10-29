import React from 'react'
import { renderWithRedux as render } from '../../../../Utils/test/testRenderers'
import ForgotPassword from '../ForgotPassword'

describe('<ForgotPassword/>', () => {
  it('renders correctly', () => {
    render(<ForgotPassword />)
  })
})
