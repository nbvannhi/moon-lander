import React from 'react'
import { 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity
} from 'react-native'
import { CommonActions } from "@react-navigation/native"

import * as Authentication from '../../api/auth'

export default ({ route, navigation }) => {
  const { username, email, password } = route.params

  const handleProfilePress = () => navigation.push('Show Profile', { username, email, password })
  const handleTimetablePress = () => navigation.push('Show Timetable', { username, email, password })
  const handleAssessmentPress = () => navigation.push('Show Assessment', { username, email, password })
  const handleGradingPress = () => navigation.push('Show Grading', { username, email, password })
  const handleButtonPress = () => {
    Authentication.signOut(
      () => navigation.dispatch(CommonActions.reset({
        index: 0, 
        routes: [{ name: 'Log In' }]
      })), 
      (error) => console.error(error)
    )
  }
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.png')}
    >
      <SafeAreaView style={styles.screen}>
        <TouchableOpacity 
          style={styles.container}
          onPress={handleProfilePress}
        >
          <Image 
            style={styles.logo}
            source={require('../../assets/images/avatar-sample.png')}
            resizeMode='contain'
          />
          <Text style={styles.title}>PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.container}
          onPress={handleTimetablePress}
        >
          <Image 
            style={styles.logo}
            source={require('../../assets/images/timetable-logo.png')}
            resizeMode='contain'
          />
          <Text style={styles.title}>TIMETABLE</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.container}
          onPress={handleAssessmentPress}
        >
          <Image 
            style={styles.logo}
            source={require('../../assets/images/assessment-logo.png')}
            resizeMode='contain'
          />
          <Text style={styles.title}>ASSESSMENT</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.container}
          onPress={handleGradingPress}
        >
          <Image 
            style={styles.logo}
            source={require('../../assets/images/grading-logo.png')}
            resizeMode='contain'
          />
          <Text style={styles.title}>GRADING</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleButtonPress}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  }, 
  screen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: StatusBar.currentHeight, 
    margin: 20, 
  }, 
  logo: {
    width: 100, 
    height: 50, 
  }, 
  container: {
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 20, 
  }, 
  title: {
    color: '#ffffff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    lineHeight: 30, 
    textAlign: 'center', 
    alignSelf: 'center', 
    marginVertical: 10, 
  }, 
  button: {
    backgroundColor: '#8e8a98', 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 300, 
    height: 40,
    marginTop: 10, 
  }, 
  text: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    lineHeight: 30, 
    alignSelf: 'center', 
  }, 
})
