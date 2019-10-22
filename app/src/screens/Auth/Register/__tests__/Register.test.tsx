import React from 'react';
import {renderWithRedux as render} from '../../../../utils/testRenderers';
import Register from '../Register';
import {cleanup} from '@testing-library/react';

describe('<Login/>', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    render(<Register />);
  });
});
