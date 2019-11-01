import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import { fireEvent, wait } from '@testing-library/react-native'
import ForgotPassword from './ForgotPassword'
import { SCREEN_NAMES } from '@navigation/constants'

describe('<ForgotPassword/>', () => {
  const getProps = (navigate?: Function) => ({
    navigation: {
      navigate,
    },
  })

  it('renders correctly', () => {
    render(<ForgotPassword />)
  })

  it('should render info text', () => {
    const { getByText } = render(<ForgotPassword />)

    expect(
      getByText(
        "In order to change lost password, type in your account's email. After a while - if email is connected to out app - you'll receive email with link to change your password",
      ),
    )
  })

  it('should validate field correctly', async () => {
    const { getByText, getByTestId } = render(<ForgotPassword />)

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

    const { getByTestId } = render(<ForgotPassword {...getProps(navigate)} />)

    fireEvent.press(getByTestId('signIn'))

    await wait(() => {
      expect(navigate).toBeCalledWith(SCREEN_NAMES.AUTH_LOGIN)
    })
  })
})
