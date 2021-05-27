import React from 'react'
import { 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet 
} from 'react-native';

export default StartUpScreen = ({ navigation }) => {
  setTimeout(() => navigation.navigate('Log In'), 2000)

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
      </SafeAreaView>
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
})
