import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {colors} from './src/consts';
import {RootNavigator} from './src/navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
