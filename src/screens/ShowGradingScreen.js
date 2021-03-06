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
            <TouchableOpacity onPress={handleAvatarPress}>
              <Image 
                style={styles.avatar}
                source={require('../../assets/images/avatar-sample.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <Text style={styles.header}>Grading</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>
              This feature is currently unavailable :(.
              Overall, your academic performance records will be displayed here, module by module. 
              It is going to show your percentage of completion of each module based on your exam grades.
              E.g., if you achieve maximum grades for all assessments then the corresponding percentage is 100%.
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
  text: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'normal', 
    lineHeight: 20, 
    textAlign: 'center', 
    alignSelf: 'center', 
  }, 
})
