import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import HomeScreen from '../screens/Home/index';
import DetailUser from '../screens/DetailUser/index';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailUser" component={DetailUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
