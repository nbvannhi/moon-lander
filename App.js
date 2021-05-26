import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ChooseUsernameScreen from './src/screens/ChooseUsernameScreen'
import EnterEmailScreen from './src/screens/EnterEmailScreen'
import CreatePasswordScreen from './src/screens/CreatePasswordScreen'
import WelcomeUserScreen from './src/screens/WelcomeUserScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name='Choose Username'
          component={ChooseUsernameScreen}
        />
        <Stack.Screen 
          name='Enter Email'
          component={EnterEmailScreen}
        />
        <Stack.Screen 
          name='Create Password'
          component={CreatePasswordScreen}
        />
        <Stack.Screen 
          name='Welcome User'
          component={WelcomeUserScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
