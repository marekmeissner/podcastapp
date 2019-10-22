import React from 'react';
import {renderWithRedux as render} from '../../../../utils/testRenderers';
import ForgotPassword from '../ForgotPassword';
import {cleanup} from '@testing-library/react';

describe('<ForgotPassword/>', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    render(<ForgotPassword />);
  });
});
