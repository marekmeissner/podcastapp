import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import { fireEvent, wait } from '@testing-library/react-native'
import { ForgotPassword } from './ForgotPassword'
import { SCREEN_NAMES } from '@navigation/constants'
import { mockUser } from '../__mocks__/mockUser'

describe('<ForgotPassword/>', () => {
  const getProps = (props?: any) => ({
    ...props,
  })

  it('renders correctly', () => {
    render(<ForgotPassword {...getProps()} />)
  })

  it('should render info text', () => {
    const { getByText } = render(<ForgotPassword {...getProps()} />)

    expect(
      getByText(
        "In order to change lost password, type in your account's email. After a while - if email is connected to out app - you'll receive email with link to change your password",
      ),
    )
  })

  it('should validate field correctly', async () => {
    const { getByText, getByTestId } = render(<ForgotPassword {...getProps()} />)

    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(getByText(/Required/i))
    })

    fireEvent.changeText(getByTestId('email'), { target: { value: 'marek@' } })
    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(getByText(/Email address provided is invalid/i))
    })
  })

  it('switches to sign in page', async () => {
    const navigate = jest.fn()

    const { getByTestId } = render(<ForgotPassword {...getProps({ navigation: { navigate } })} />)

    fireEvent.press(getByTestId('signIn'))

    await wait(() => {
      expect(navigate).toBeCalledWith(SCREEN_NAMES.AUTH_LOGIN)
    })
  })

  it('should display info text', () => {
    const { getByText } = render(<ForgotPassword {...getProps()} />)

    expect(
      getByText(
        /In order to change lost password, type in your account's email. After a while - if email is connected to out app - you'll receive email with link to change your password/i,
      ),
    )
  })

  it('should send link to reset password', async () => {
    const forgotPassword = jest.fn(),
      { getByText, getByTestId } = render(<ForgotPassword {...getProps({ forgotPassword })} />)

    fireEvent.changeText(getByTestId('email'), { target: { value: mockUser.email } })
    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(forgotPassword).toBeCalledTimes(1)
      expect(forgotPassword).toBeCalledWith(mockUser.email)
      expect(getByText(/Email has been sent!/i))
    })
  })
})
