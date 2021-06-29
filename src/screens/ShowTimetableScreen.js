import React, { useEffect, useState } from 'react'
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
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import * as Authentication from '../../api/auth'
import * as Modules from '../../api/modules'


export default ({ navigation }) => {
  const userId = Authentication.getCurrentUserId()

  const handleShowModules = () => navigation.navigate('Show Modules')
  const handleShowNavigation = () => navigation.navigate('Show Menu')

  const scrollViewRef = (ref) => {
     TimeTableView.timetableRef = ref;
   };
  const [modules, setModules] = useState({})
  const [moduleList, setModuleList] = useState([])
  useEffect(() => {
    return Modules.subscribe(userId, setModules)
  }, [])

  useEffect(() => {
    if (modules) {
      const modulesTemp = []
      const modulesArray = Object.values(modules)
      if (modulesArray.length > 0) modulesTemp.push({ data: modulesArray })
      setModuleList(modulesTemp)
    }
  }, [modules])

  var eventList = []
    for (const module of moduleList){
       for (const classes of module.data[0].lessons){
           const classStartTime = Number(classes.startTime)
           const classEndTime = Number(classes.endTime)
           const startHour = classStartTime/100
           const endHour = classEndTime /100
           const startMinute = classStartTime%100
           const endMinute = classEndTime%100
           const lesson = {
                title: module.data[0].code,
                startTime: genTimeBlock(classes.day, startHour, startMinute),
                endTime: genTimeBlock(classes.day, endHour, endMinute),
                location: classes.venue,
                extra_descriptions: [],
              }
              eventList.push(lesson)
            }
        }


  const onEventPress=()=>{

  }

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
          <View style={styles.timetableContainer}>
            <TimeTableView
              scrollViewRef={scrollViewRef}
              events={eventList}
              pivotTime={7}
              pivotEndTime={20}
              pivotDate={genTimeBlock('mon')}
              numberOfDays={5}
              onEventPress={onEventPress}
              headerStyle={styles.headerStyle}
              formatDateHeader="dddd"
              locale="en"
            />
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
  timetableContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: 20,
  },
  headerStyle: {
    backgroundColor: 'orange'
  },
})
