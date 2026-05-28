/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import WiildMoodtrailssApp from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<WiildMoodtrailssApp />);
  });
});
