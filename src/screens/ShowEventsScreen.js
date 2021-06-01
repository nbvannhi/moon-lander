import React from 'react'
import { 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'
import { CommonActions } from '@react-navigation/native'

export default ({ route, navigation }) => {
  const { username, email, password } = route.params
  
  const handleShowNavigation = () => {
    navigation.dispatch(CommonActions.reset({
      index: 0, 
      routes: [{
        name: 'Show Menu', 
        params: { username, email, password }
      }]
    }))
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.png')}
    >
      <SafeAreaView style={styles.screen}>
        <ScrollView>
          <View style={styles.top}>
            <TouchableOpacity onPress={handleShowNavigation}>
              <Image 
                style={styles.avatar}
                source={require('../../assets/images/avatar-sample.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <Text style={styles.header}>Upcoming Events</Text>
          </View>
          <View></View>
          <View style={styles.container}>
            <Text style={styles.text}>
              Sorry, this feature is currently unavailable :(.
            </Text>
          </View>
        </ScrollView>
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
    paddingTop: StatusBar.currentHeight, 
    margin: 20, 
  }, 
  top: {
    flex: 0.08, 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
  }, 
  container: {
    flex: 0.92, 
    alignItems: 'center', 
    paddingHorizontal: 40, 
    paddingTop: 20, 
  }, 
  avatar: {
    marginRight: 20, 
    width: 50, 
    height: 50, 
  }, 
  header: {
    color: '#ffffff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    lineHeight: 24, 
    textAlign: 'center', 
    alignSelf: 'center',  
  }, 
  text: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'normal', 
    lineHeight: 20, 
    textAlign: 'center', 
    alignSelf: 'center', 
  }, 
})
