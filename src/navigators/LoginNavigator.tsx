import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens';

const Stack = createStackNavigator();

// @refresh reset
const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginMain" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
