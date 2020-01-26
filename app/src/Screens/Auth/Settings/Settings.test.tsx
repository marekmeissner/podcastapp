import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import { Settings } from './Settings'
import { mockUser } from '../__mocks__/mockUser'
import { fireEvent } from '@testing-library/react-native'
import { SCREEN_NAMES } from '@navigation/constants'

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

  it('should send reset password link', () => {
    const forgotPassword = jest.fn()
    forgotPassword.mockReturnValue(true)
    const { getByTestId, getByText } = render(<Settings {...getProps({ forgotPassword })} />)

    fireEvent.press(getByTestId('resetPassword'))

    expect(forgotPassword).toBeCalledTimes(1)
    expect(forgotPassword).toBeCalledWith(mockUser.email)
    expect(getByText(/Reset link has been sent!/i))
  })

  it('should have logout button', () => {
    const { getByTestId } = render(<Settings {...getProps()} />)

    expect(getByTestId('logout'))
  })

  it('should logout user and redirect to login page', () => {
    const logout = jest.fn(),
      navigate = jest.fn()
    const { getByTestId } = render(<Settings {...getProps({ navigation: { navigate }, logout })} />)

    fireEvent.press(getByTestId('logout'))
    expect(logout).toBeCalledTimes(1)
    expect(navigate).toBeCalledTimes(1)
    expect(navigate).toBeCalledWith(SCREEN_NAMES.AUTH_LOGIN)
  })
})
