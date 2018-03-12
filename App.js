import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Root, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

import Home from './app/components/Home';
import Settings from './app/components/Settings';

export default class App extends Component<Props> {
  render() {
    return (
      <Root>
        <StyleProvider style={getTheme(platform)}>
          <RootStack/>
        </StyleProvider>
      </Root>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Settings: {
      screen: Settings,
    }
  },
  {
    initialRouteName: 'Home',
  }
);
