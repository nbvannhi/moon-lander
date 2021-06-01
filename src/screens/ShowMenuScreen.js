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

import * as Authentication from '../../api/auth'

export default ({ navigation }) => {
  const handleShowProfile = () => navigation.navigate('Show Profile')
  const handleShowTimetable = () => navigation.navigate('Show Timetable')
  const handleShowAssessment = () => navigation.navigate('Show Assessment')
  const handleShowGrading = () => navigation.navigate('Show Grading')
  const handleLogOut = () => {
    Authentication.signOut(
      () => navigation.navigate('Log In'), 
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
          onPress={handleShowProfile}
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
          onPress={handleShowTimetable}
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
          onPress={handleShowAssessment}
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
          onPress={handleShowGrading}
        >
          <Image 
            style={styles.logo}
            source={require('../../assets/images/grading-logo.png')}
            resizeMode='contain'
          />
          <Text style={styles.title}>GRADING</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.container}
          onPress={handleLogOut}
        >
          <Image 
            style={styles.logo}
            source={require('../../assets/images/logout-logo.png')}
            resizeMode='contain'
          />
          <Text style={styles.title}>LOGOUT</Text>
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
