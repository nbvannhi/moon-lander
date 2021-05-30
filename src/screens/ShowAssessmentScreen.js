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

import ActionButton from "../values/actionButtons"

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
        <ScrollView>
          <View style={styles.top}>
            <ActionButton />
            <Text style={styles.header}>Assessment</Text>
          </View>
          <View></View>
          <View style={styles.container}>
              <TouchableOpacity>
                     <Text style={styles.title}>Upcoming Events</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.text}> MA1521 Final Exam {"\n"} 21-Nov-2020 2:00 PM 4MC</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.container}>
                 <TouchableOpacity>
                     <Text style={styles.title}>Current Modules</Text>
                 </TouchableOpacity>
                 <Text style={styles.text}>Empty</Text>
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
    alignItems: 'flex-start',
    marginLeft: 50,
    paddingTop: 20,
    height: 300,
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
  title: {
    color: '#ffffff',
    fontSize: 18,
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
    alignSelf: 'flex-start',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#8e8a98',
  }, 
})
