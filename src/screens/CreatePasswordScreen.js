import React, { useState } from 'react'
import { 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native'

export default ({ navigation }) => {
  const [password, setPassword] = React.useState('')

  const handlePasswordUpdate = (password) => setPassword(password)
  const handleButtonPress = () => {
    setPassword('')
    navigation.navigate('Welcome User')
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.png')}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Password</Text>
          <Text style={styles.subtitle}>
            You're advised to create a strong password to protect your account better.
          </Text>
        </View>
        <View style={styles.container}>
          <TextInput 
            style={styles.field}
            placeholder='Password'
            placeholderTextColor='#aaa7b2'
            value={password}
            textContentType='password'
            selectionColor='#8e8a98'
            secureTextEntry={true}
            maxLength={30}
            onChangeText={handlePasswordUpdate}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={handleButtonPress}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center', 
    paddingTop: StatusBar.currentHeight, 
    margin: 20, 
  }, 
  container: {
    alignItems: 'center', 
    paddingHorizontal: 40, 
    paddingTop: 20, 
  }, 
  title: {
    color: '#ffffff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    lineHeight: 40, 
    textAlign: 'center', 
  }, 
  subtitle: {
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: 'normal', 
    lineHeight: 20, 
    textAlign: 'center', 
  }, 
  field: {
    backgroundColor: '#565065', 
    borderRadius: 5, 
    color: '#ffffff', 
    fontSize: 16, 
    lineHeight: 30, 
    paddingLeft: 10, 
    width: 300, 
    height: 40, 
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
})
