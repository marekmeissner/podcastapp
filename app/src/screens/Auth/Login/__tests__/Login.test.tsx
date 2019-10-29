import React from 'react'
import { renderWithRedux as render } from '../../../../Utils/test/testRenderers'
import Login from '../Login'

describe('<Login/>', () => {
  it('renders correctly', () => {
    render(<Login />)
  })
})
