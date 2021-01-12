import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { LoginStackParamList } from '../types';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator<LoginStackParamList>();

function LoginNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> */}
    </Stack.Navigator>
  );
}

export default LoginNavigator;
