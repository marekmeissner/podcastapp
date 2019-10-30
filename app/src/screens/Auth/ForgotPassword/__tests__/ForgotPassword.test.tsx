import React from 'react'
import { renderWithRedux as render } from '@util/index'
import ForgotPassword from '../ForgotPassword'

describe('<ForgotPassword/>', () => {
  it('renders correctly', () => {
    render(<ForgotPassword />)
  })
})
