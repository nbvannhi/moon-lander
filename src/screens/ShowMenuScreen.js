import React, { useState } from 'react'
import { 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity
} from 'react-native'

export default ({ navigation }) => {
  const handleProfilePress = () => navigation.navigate('Show Profile')
  const handleTimetablePress = () => navigation.navigate('Show Timetable')
  const handleAssessmentPress = () => navigation.navigate('Show Assessment')
  const handleGradingPress = () => navigation.navigate('Show Grading')

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
    marginVertical: 10, 
  }, 
})
