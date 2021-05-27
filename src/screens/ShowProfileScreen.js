import React, { useState } from 'react'
import { 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'

export default ({ navigation }) => {
  const handleAvatarPress = () => {
    navigation.navigate('Show Menu')
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.png')}
    >
      <SafeAreaView style={styles.screen}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/avatar-sample.png')}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>Hi, example_username</Text>
          <Text style={styles.subtitle}>
            Your profile details will be displayed here. 
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and 
            scrambled it to make a type specimen book.
          </Text>
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
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: StatusBar.currentHeight, 
    margin: 20, 
  }, 
  avatar: {
    width: 150, 
    height: 150, 
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
    lineHeight: 30, 
    textAlign: 'center', 
    marginVertical: 10, 
  }, 
  subtitle: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'normal', 
    lineHeight: 20, 
    textAlign: 'center', 
  }, 
})
