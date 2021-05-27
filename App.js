import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ChooseUsernameScreen from './src/screens/ChooseUsernameScreen'
import EnterEmailScreen from './src/screens/EnterEmailScreen'
import CreatePasswordScreen from './src/screens/CreatePasswordScreen'
import WelcomeUserScreen from './src/screens/WelcomeUserScreen'
import ShowMenuScreen from './src/screens/ShowMenuScreen'

import ShowProfileScreen from './src/screens/ShowProfileScreen'
import ShowTimetableScreen from './src/screens/ShowTimetableScreen'
import ShowAssessmentScreen from './src/screens/ShowAssessmentScreen'
import ShowGradingScreen from './src/screens/ShowGradingScreen'

import AddModuleScreen from './src/screens/AddModuleScreen'

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
        <Stack.Screen 
          name='Show Menu'
          component={ShowMenuScreen}
        />
        
        <Stack.Screen 
          name='Show Profile'
          component={ShowProfileScreen}
        />
        <Stack.Screen 
          name='Show Timetable'
          component={ShowTimetableScreen}
        />
        <Stack.Screen 
          name='Show Assessment'
          component={ShowAssessmentScreen}
        />
        <Stack.Screen 
          name='Show Grading'
          component={ShowGradingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
