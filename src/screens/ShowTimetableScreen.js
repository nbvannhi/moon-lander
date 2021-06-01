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

export default ({ navigation }) => {
  const handleShowModules = () => navigation.navigate('Show Modules')
  const handleShowNavigation = () => navigation.navigate('Show Menu')

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.png')}
    >
      <SafeAreaView style={styles.screen}>
        <ScrollView>
        <View style={styles.top}>
            <View style={styles.left}>
              <TouchableOpacity onPress={handleShowNavigation}>
                <Image 
                  style={styles.avatar}
                  source={require('../../assets/images/avatar-sample.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <Text style={styles.header}>Timetable</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity onPress={handleShowModules}>
                <Image 
                  style={styles.icon}
                  source={require('../../assets/images/list-icon.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>
              This feature is currently unavailable :(.
              Overall, your current timetable, similar to the one on NUSMODS will be displayed here.
              You can choose to view all your current modules / add new module throung the two buttons on the header.
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
    justifyContent: 'space-between', 
    alignItems: 'center', 
  }, 
  container: {
    flex: 0.92, 
    alignItems: 'center', 
    paddingHorizontal: 40, 
  }, 
  left: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
  }, 
  right: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
  }, 
  avatar: {
    marginRight: 10, 
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
  icon: {
    margin: 5, 
    width: 30, 
    height: 30, 
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
