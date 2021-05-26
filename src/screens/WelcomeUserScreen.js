import React, { useState } from 'react'
import { 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'
import { Divider } from 'react-native-elements'

export default ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate('Show Menu')
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.png')}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to MoonLander, example_username</Text>
          <Text style={styles.subtitle}>
            You're invited to join the cruise team of our spaceship. 
            Become a MoonLander to explore things beyond the starts.
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleButtonPress}>
            <Text style={styles.text}>Complete Sign-up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Divider style={styles.divider} />
      <View style={styles.bottom}>
        <Text style={styles.footer}>
          By creating an account, you agree to the
          <Text style={{ fontWeight: 'bold' }}> MoonLander Terms </Text>and
          <Text style={{ fontWeight: 'bold' }}> Privacy Polic.</Text>
        </Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  }, 
  screen: {
    flex: 0.92, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: StatusBar.currentHeight, 
    margin: 20, 
  }, 
  container: {
    alignItems: 'center', 
    paddingHorizontal: 40, 
    paddingTop: 20, 
  }, 
  divider: {
    height: 1, 
    backgroundColor: '#8e8a98', 
  }, 
  bottom: {
    flex: 0.08, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 40, 
  }, 
  title: {
    color: '#ffffff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    lineHeight: 30, 
    textAlign: 'center', 
    marginVertical: 10, 
  }, 
  subtitle: {
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: 'normal', 
    lineHeight: 20, 
    textAlign: 'center', 
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
  }, 
  footer: {
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: 'normal',
    lineHeight: 20,  
    textAlign: 'center', 
  }, 
})
