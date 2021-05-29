import React from 'react'
import { 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native'
import { Divider } from 'react-native-elements'
import { CommonActions } from '@react-navigation/native'

import * as Authentication from '../../api/auth'

export default LogInScreen = ({ navigation }) => {
  const [id, setId] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoginLoading, setIsLoginLoading] = React.useState(false)

  const handleIdUpdate = (id) => setId(id)
  const handlePasswordUpdate = (password) => setPassword(password)
  const handleButtonPress = () => {
    setIsLoginLoading(true)

    Authentication.signIn(
      { email: id, password: password }, 
      (user) => navigation.dispatch(CommonActions.reset({
        index: 0, 
        routes: [{
          name: 'Show Menu', 
          params: { username: user.displayName, email: id, password }
        }]
      })), 
      (error) => {
        setIsLoginLoading(false)
        return console.error(error)
      }
    )
  }
  const handleTextPress = () => {
    navigation.navigate('Choose Username')
  }

  return(
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.png')}
    >
      <SafeAreaView style={styles.screen}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
          resizeMode='contain'
        />
        <View>
          <TextInput 
            style={styles.field} 
            placeholder='Email' 
            placeholderTextColor='#aaa7b2' 
            value={id}
            selectionColor='#8e8a98'
            maxLength={30} 
            onChangeText={handleIdUpdate} 
          />
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
            loading={isLoginLoading}
            onPress={handleButtonPress}>
            <Text style={styles.text}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Divider style={styles.divider} />
      <View style={styles.bottom}>
        <Text style={styles.footer}>Unhappy with landing among the stars? </Text>
        <TouchableOpacity onPress={handleTextPress}>
          <Text style={styles.link}>Sign up.</Text>
        </TouchableOpacity>
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
  logo: {
    width: 200, 
    height: 200, 
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
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 40, 
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
    marginTop: 10, 
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
  footer: {
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: 'normal',
    lineHeight: 20,  
    textAlign: 'center', 
    alignSelf: 'center', 
  }, 
  link: {
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: 'bold',
    lineHeight: 20,  
    textAlign: 'center', 
    alignSelf: 'center', 
  }, 
})
