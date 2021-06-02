import React, { useState } from 'react'
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  SectionList,
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
import * as Events from '../../api/events'

class Date {
  constructor(day, startTime, duration) {
    this.day = day
    this.startTime = startTime
    this.duration = duration
  }
}

export default ({ navigation }) => {
  const userId = Authentication.getCurrentUserId()

  const [moduleCode, setModuleCode] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState([])
  const [day, setDay] = useState('')
  const [startTime, setStartTime] = useState('0000')
  const [duration, setDuration] = useState('0')
  const [isVisible, setIsVisible] = useState(false)

  const showPicker = () => setIsVisible(true)

  const handleModuleCodeUpdate = (moduleCode) => setModuleCode(moduleCode)
  const handleTypeUpdate = (type) => setType(type)
  const handleDateUpdate = (day, startTime, duration) => {
    const date = new Date(day, startTime, duration)
    dates.push(date)
    setDate(dates)
  }
  const handleDayUpdate = (itemValue, itemIndex) => setDay(itemValue)
  const handleTimeUpdate = (type) => (event, selectedValue) => {
    const selectedTime = selectedValue || new Date()
    const hour = selectedTime.getHours()
    const minute = selectedTime.getMinutes()
    const selectedHour = hour < 9 ? '0' + hour.toString() : hour.toString()
    const selectedMinute = minute < 9 ? '0' + minute.toString() : minute.toString()
    if (type === 'START') setStartTime(selectedHour + selectedMinute)
    setIsVisible(false)
  }
  const handleDurationUpdate = (duration) => setDuration(duration)

  const handleAddDate = () => {}
  const handleCreateEvent = () => Events.createEvent(
    { userId, moduleCode, type, percentage, dates },
    () => navigation.navigate('Show Events'),
    (error) => console.error(error)
  )
  const handleDiscardEvent = () => navigation.navigate('Show Events')
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
            <Text style={styles.header}>New Events</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity onPress={handleDiscardEvent}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/cancel-icon.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateEvent}>
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
              placeholder='Module code'
              placeholderTextColor='#aaa7b2'
              value={moduleCode}
              selectionColor='#8e8a98'
              maxLength={30}
              onChangeText={handleModuleCodeUpdate}
            />
            <TextInput
              style={styles.field}
              placeholder='Event type, eg: final, quiz'
              placeholderTextColor='#aaa7b2'
              value={type}
              selectionColor='#8e8a98'
              maxLength={10}
              onChangeText={handleTypeUpdate}
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
                  <TouchableOpacity onPress={showPicker}>
                    <Text style={styles.time}>{startTime}</Text>
                  </TouchableOpacity>
                  {isVisible && (
                    <DateTimePicker
                      testID='dateTimePicker'
                      value={startTime}
                      mode='time'
                      is24Hour={false}
                      display='spinner'
                      onChange={handleTimeUpdate('START')}
                    />
                  )}
                  <Text style={styles.time}> - </Text>
                </View>
              </View>
              <TextInput
                style={styles.venue}
                value={duration}
                selectionColor='#8e8a98'
                maxLength={30}
                onChangeText={handleDurationUpdate}
              />
              {handleLessonsUpdate(day, startTime, duration)}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddLesson}>
              <Text style={styles.text}>Add date</Text>
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
