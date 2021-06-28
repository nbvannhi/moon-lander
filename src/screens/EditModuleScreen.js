import React, { useEffect, useState } from 'react'
import { 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'

import * as Authentication from '../../api/auth'
import * as Modules from '../../api/modules'

class Lesson {
  constructor(day, startTime, endTime, venue) {
    this.day = day
    this.startTime = startTime
    this.endTime = endTime
    this.venue = venue
  }
}

export default ({ route, navigation }) => {
  const { moduleId } = route.params
  const userId = Authentication.getCurrentUserId()

  const [module, setModule] = useState({})
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [lessons, setLessons] = useState({})
  const [lessonList, setLessonList] = useState([])
  const [day, setDay] = useState('')
  const [startTime, setStartTime] = useState('0000')
  const [endTime, setEndTime] = useState('0000')
  const [venue, setVenue] = useState('')

  useEffect(() => {
    return Modules.reviewModule({ userId, moduleId }, setModule)
  }, [])

  useEffect(() => {
    if (module) {
      setName(module.name)
      setCode(module.code)
      setLessons(module.lessons)
    }
  }, [module])

  useEffect(() => {
    if (lessons) {
      const lessonsTemp = []
      const lessonsArray = Object.values(lessons)
      if (lessonsArray.length > 0) lessonsTemp.push({ data: lessonsArray })
      setLessonList(lessonsTemp)
      if (lessonsTemp.length > 0) {
        setDay(lessons[0].day)
        setStartTime(lessons[0].startTime)
        setEndTime(lessons[0].endTime)
        setVenue(lessons[0].venue)
      }
    }
  }, [lessons])

  const [startDate, setStartDate] = useState(new Date(2021, 1, 1, 0, 0))
  const [endDate, setEndDate] = useState(new Date(2021, 1, 1, 0, 0))
  const [isStartPickerShown, setIsStartPickerShown] = useState(false)
  const [isEndPickerShown, setIsEndPickerShown] = useState(false)

  const showStartPicker = () => setIsStartPickerShown(true)
  const showEndPicker = () => setIsEndPickerShown(true)
  const showTime = (time) => {
    const hour = formatTime(time.getHours())
    const minute = formatTime(time.getMinutes())
    return hour + minute
  }
  
  const formatTime = (time) => time < 9 ? '0' + time.toString() : time.toString()  
  
  const handleNameUpdate = (name) => setName(name)
  const handleCodeUpdate = (code) => setCode(code)
  const handleLessonsUpdate = (day, startTime, endTime, venue) => {
    const startTimeStr = showTime(startTime)
    const endTimeStr = showTime(endTime)
    const lesson = new Lesson(day, startTimeStr, endTimeStr, venue)
    lessonList.push(lesson)
    setLessonList(lessons)
  }
  const handleDayUpdate = (itemValue, itemIndex) => setDay(itemValue)
  const handleStartDateUpdate = (event, selectedValue) => {
    const selectedDate = selectedValue || startDate
    setStartTime(showTime(selectedDate))
    setStartDate(selectedDate)
    setIsStartPickerShown(false)
  }
  const handleEndDateUpdate = (event, selectedValue) => {
    const selectedDate = selectedValue || endDate
    setEndTime(showTime(selectedDate))
    setEndDate(selectedDate)
    setIsEndPickerShown(false)
  }
  const handleVenueUpdate = (venue) => setVenue(venue)

  const handleAddLesson = () => {}
  const handleUpdateModule = () => {
    handleLessonsUpdate(day, startTime, endTime, venue)
    Modules.updateModule(
      { userId, name, code, lessons }, 
      () => navigation.navigate('Show Modules'), 
      (error) => console.error(error)
    )
  }
  const handleDiscardChanges = () => navigation.navigate('Show Modules')
  const handleShowNavigation = () => navigation.navigate('Show Menu')
  
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.png')}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.top}>
          <View style={styles.left}>
            <TouchableOpacity onPress={handleShowNavigation}>
              <Image 
                style={styles.avatar}
                source={require('../../assets/images/avatar-sample.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <Text style={styles.header}>Edit Module</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity onPress={handleDiscardChanges}>
              <Image 
                style={styles.icon}
                source={require('../../assets/images/cancel-icon.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdateModule}>
              <Image 
                style={styles.icon}
                source={require('../../assets/images/save-icon.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <TextInput 
              style={styles.field} 
              value={name}
              selectionColor='#8e8a98'
              maxLength={30} 
              onChangeText={handleNameUpdate} 
            />
            <TextInput 
              style={styles.field} 
              value={code}
              selectionColor='#8e8a98'
              maxLength={10} 
              onChangeText={handleCodeUpdate} 
            />
            <View style={styles.detail}>
              <View style={styles.date}>
                <Picker
                  style={styles.day}
                  selectedValue={day}
                  onValueChange={handleDayUpdate}
                  mode='dropdown'
                >
                  <Picker.Item style={styles} label='Monday' value='MON' />
                  <Picker.Item style={styles} label='Tuesday' value='TUE' />
                  <Picker.Item style={styles} label='Wednesday' value='WED' />
                  <Picker.Item style={styles} label='Thursday' value='THU' />
                  <Picker.Item style={styles} label='Friday' value='FRI' />
                  <Picker.Item style={styles} label='Saturday' value='SAT' />
                  <Picker.Item style={styles} label='Sunday' value='SUN' />
                </Picker>
                <View style={styles.picker}>
                  <TouchableOpacity onPress={showStartPicker}>
                    <Text style={styles.time}>{startTime}</Text>
                  </TouchableOpacity>
                  {isStartPickerShown && (
                    <DateTimePicker
                      testID='dateTimePicker'
                      value={startDate}
                      mode='time'
                      is24Hour={false}
                      display='spinner'
                      onChange={handleStartDateUpdate}
                    />
                  )}
                  <Text style={styles.time}> - </Text>
                  <TouchableOpacity onPress={showEndPicker}>
                    <Text style={styles.time}>{endTime}</Text>
                  </TouchableOpacity>
                  {isEndPickerShown && (
                    <DateTimePicker
                      testID='dateTimePicker'
                      value={endDate}
                      mode='time'
                      is24Hour={false}
                      display='spinner'
                      onChange={handleEndDateUpdate}
                    />
                  )}
                </View>
              </View>
              <TextInput 
                style={styles.venue} 
                placeholder='Venue' 
                placeholderTextColor='#aaa7b2' 
                value={venue}
                selectionColor='#8e8a98'
                maxLength={30} 
                onChangeText={handleVenueUpdate} 
              />
            </View>
            <TouchableOpacity 
              style={styles.button}
              onPress={handleAddLesson}>
              <Text style={styles.text}>Add lesson</Text>
            </TouchableOpacity>
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
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 50, 
  }, 
  container: {
    flex: 0.92, 
    alignItems: 'center', 
    paddingHorizontal: 40, 
    paddingTop: 20, 
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
  field: {
    backgroundColor: '#565065', 
    borderRadius: 5, 
    color: '#ffffff', 
    fontSize: 16, 
    lineHeight: 30, 
    paddingLeft: 10, 
    width: 250, 
    height: 40, 
    marginTop: 10, 
    marginHorizontal: 130, 
  }, 
  detail: {
    flexDirection: 'column', 
    backgroundColor: '#565065', 
    borderRadius: 5, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    color: '#ffffff', 
    fontSize: 16, 
    lineHeight: 30, 
    width: 250, 
    height: 70, 
    marginTop: 10, 
    marginHorizontal: 130, 
    paddingVertical: 5, 
  }, 
  date: {
    flexDirection: 'row', 
    color: '#ffffff', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingRight: 10, 
    width: 250, 
    height: 30, 
  }, 
  day: {
    backgroundColor: '#565065', 
    color: '#ffffff', 
    fontSize: 16, 
    lineHeight: 30, 
    width: 150, 
    height: 30, 
  }, 
  picker: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' }, 
  time: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'normal', 
    lineHeight: 30, 
    alignSelf: 'center', 
  }, 
  venue: {
    paddingLeft: 10, 
    color: '#ffffff', 
    fontSize: 16, 
    lineHeight: 30, 
    width: 250, 
    height: 30, 
  }, 
  button: {
    backgroundColor: '#8e8a98', 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 250, 
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
})
