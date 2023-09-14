import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useTheme } from '../hooks';
import { useFlipper } from '@react-navigation/devtools';
import { RootNavigator } from '@/navigators/RootNavigator';

// const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        {/*<StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />*/}

        {/*<Stack.Navigator screenOptions={{ headerShown: false }}>*/}
        {/*  <Stack.Screen name="Startup" component={Startup} />*/}
        {/*  <Stack.Screen name="Login" component={LoginNavigator} />*/}
        {/*</Stack.Navigator>*/}
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
