/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import WlffMuddTraillsApp from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<WlffMuddTraillsApp />);
  });
});
