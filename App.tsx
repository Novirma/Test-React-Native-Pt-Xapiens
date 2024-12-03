/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    // <SafeAreaView style={styles.root}>
    //   <SignInScreen />
    //   {/* <SignUpScreen /> */}
    // </SafeAreaView>
    <AppNavigator />
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9fbfc',
  },
});

export default App;
