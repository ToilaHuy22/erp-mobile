import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationStackParamList } from 'types/navigation';
import { Startup } from '@/screens';
import LoginNavigator from '@/navigators/LoginNavigator';
import AuthorNavigator from '@/navigators/AuthorNavigator';

const RootStack = createStackNavigator<ApplicationStackParamList>();

export const RootNavigator = () => {
  const [au, setAu] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const root = !au ? (
    <RootStack.Screen name="Login" component={LoginNavigator} />
  ) : (
    <RootStack.Screen name="Main" component={AuthorNavigator} />
  );

  return (
    <RootStack.Navigator
      initialRouteName={'Startup'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      {loading ? (
        <RootStack.Screen name={'Startup'} component={Startup} />
      ) : (
        root
      )}
    </RootStack.Navigator>
  );
};
