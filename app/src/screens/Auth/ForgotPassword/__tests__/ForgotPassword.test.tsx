import React from 'react';
import {renderWithRedux as render} from '@util/test/testRenderers';
import ForgotPassword from '../ForgotPassword';

describe('<ForgotPassword/>', () => {
  it('renders correctly', () => {
    render(<ForgotPassword />);
  });
});