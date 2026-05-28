import React from 'react';
import {WiildMoodtrailssRootNavigator} from './WiildMoodtrailssRootNavigator';
import {AppProvider} from './WilldmoodTralls/app/AppProvider';

function WiildMoodtrailssApp(): React.JSX.Element {
  return (
    <AppProvider>
      <WiildMoodtrailssRootNavigator />
    </AppProvider>
  );
}

export default WiildMoodtrailssApp;
