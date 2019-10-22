import React from 'react';
import {renderWithRedux as render} from '../../../../utils/testRenderers';
import Login from '../Login';
import {cleanup} from '@testing-library/react';

describe('<Login/>', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    render(<Login />);
  });
});
