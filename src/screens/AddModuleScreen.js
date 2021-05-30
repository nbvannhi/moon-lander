import React, { useState } from 'react'
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
import { CommonActions } from '@react-navigation/native'

import * as Authentication from '../../api/auth'
import * as Modules from '../../api/modules'

class ClassTime {
  constructor(day, startTime, endTime, room) {
    this.day = day
    this.startTime = [startTime.getHours(), startTime.getMinutes()]
    this.endTime = [endTime.getHours(), endTime.getMinutes()]
    this.room = room
  }
}

export default ({ route, navigation }) => {
  const { username, email, password } = route.params
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [classes, setClasses] = useState([])
  const [numOfClasses, setNumOfClasses] = useState(0)
  const [day, setDay] = useState('')
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [room, setRoom] = useState('')
  const [showStartTime, setShowStartTime] = useState(false)
  const [showEndTime, setShowEndTime] = useState(false)
  const [userId, setUserId] = useState(Authentication.getCurrentUserId())

  const handleNameUpdate = (name) => setName(name)
  const handleCodeUpdate = (code) => setCode(code)
  const handleClassesUpdate = (classTime) => {
    classes.push(classTime)
    setClasses(classes)
  }
  const handleNumOfClassesUpdate = (numOfClasses) => setNumOfClasses(numOfClasses+1)
  const handleDayUpdate = (day) => setDay(day)
  const handleStartTimeUpdate = (event, selectedValue) => {
    const selectedTime = selectedValue || new Date()
    setShowStartTime(false)
    setStartTime(selectedTime)
  }
  const handleEndTimeUpdate = (event, selectedValue) => {
    const selectedTime = selectedValue || new Date()
    setShowEndTime(false)
    setEndTime(selectedTime)
  }
  const handleRoomUpdate = (room) => setRoom(room)
  const showStartTimePicker = () => setShowStartTime(true)
  const showEndTimePicker = () => setShowEndTime(true)
  const formatTime = (time) => `${time.getHours()}:${time.getMinutes()}`;

  const handleAddClass = () => {
    const newClass = new ClassTime(day, startTime, endTime, room)
    handleClassesUpdate(newClass)
    handleNumOfClassesUpdate(numOfClasses)
    handleDayUpdate('')
    handleStartTimeUpdate(new Date())
    handleEndTimeUpdate(new Date())
    handleRoomUpdate('')
  }
  const handleCreateModule = () => {
    handleAddClass()
    return Modules.createModule(
      { userId, name, code, classes }, 
      () => navigation.dispatch(CommonActions.reset({
        index: 0, 
        routes: [{
          name: 'Show Modules', 
          params: { username, email, password }
        }]
      })), 
      console.error
    )
  }
  const handleCancelProcess = () => {
    navigation.navigate('Show Timetable')
  }
  const handleShowNavigation = () => {
    navigation.navigate('Show Menu')
  }
  
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
            <Text style={styles.header}>New Module</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity onPress={handleCancelProcess}>
              <Image 
                style={styles.icon}
                source={require('../../assets/images/cancel-icon.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateModule}>
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
              placeholder='Module name' 
              placeholderTextColor='#aaa7b2' 
              value={name}
              selectionColor='#8e8a98'
              maxLength={30} 
              onChangeText={handleNameUpdate} 
            />
            <TextInput 
              style={styles.field} 
              placeholder='Module code' 
              placeholderTextColor='#aaa7b2' 
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
                  dropdownIconColor='ffffff'
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
                  <TouchableOpacity onPress={showStartTimePicker}>
                    <Text style={styles.time}>{formatTime(startTime)}</Text>
                  </TouchableOpacity>
                  {showStartTime && (
                    <DateTimePicker
                      testID='dateTimePicker'
                      value={startTime}
                      mode='time'
                      is24Hour={false}
                      display='spinner'
                      onChange={handleStartTimeUpdate}
                    />
                  )}
                  <Text style={styles.time}> - </Text>
                  <TouchableOpacity onPress={showEndTimePicker}>
                    <Text style={styles.time}>{formatTime(endTime)}</Text>
                  </TouchableOpacity>
                  {showEndTime && (
                    <DateTimePicker
                      testID='dateTimePicker'
                      value={endTime}
                      mode='time'
                      is24Hour={false}
                      display='spinner'
                      onChange={handleEndTimeUpdate}
                    />
                  )}
                </View>
              </View>
              <TextInput 
                style={styles.room} 
                placeholder='Room' 
                placeholderTextColor='#aaa7b2' 
                value={room}
                selectionColor='#8e8a98'
                maxLength={30} 
                onChangeText={handleRoomUpdate} 
              />
            </View>
            <TouchableOpacity 
              style={styles.button}
              onPress={handleAddClass}>
              <Text style={styles.text}>Add class</Text>
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
  room: {
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
