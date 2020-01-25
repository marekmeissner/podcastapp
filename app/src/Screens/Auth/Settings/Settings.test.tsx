import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import Settings from './Settings'
import { mockUser } from '../__mocks__/mockUser'

describe('<Settings />', () => {
  const getProps = (props?: any) => ({
    user: mockUser,
    ...props,
  })

  it('renders correctly', () => {
    render(<Settings {...getProps()} />)
  })

  it('should have send reset password button', () => {
    const { getByTestId } = render(<Settings {...getProps()} />)
    expect(getByTestId('resetPassword'))
  })

  it('should have logout button', () => {
    const { getByTestId } = render(<Settings {...getProps()} />)

    expect(getByTestId('logout'))
  })
})
