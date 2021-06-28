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
import DateTimePicker from '@react-native-community/datetimepicker'

import * as Authentication from '../../api/auth'
import * as Events from '../../api/events'


export default ({ navigation }) => {
  const userId = Authentication.getCurrentUserId()

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date(2021, 0, 1, 0, 0))
  const [time, setTime] = useState(new Date(2021, 1, 1, 0, 0))
  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')

  const [isDatePickerShown, setIsDatePickerShown] = useState(false)
  const [isTimePickerShown, setIsTimePickerShown] = useState(false)

  const showDatePicker = () => setIsDatePickerShown(true)
  const showTimePicker = () => setIsTimePickerShown(true)
  const showDate = (date) => {
    const day = formatTime(date.getDate())
    const month = formatTime(date.getMonth()+1)
    const year = date.getFullYear().toString()
    return year + month + day
  }
  const showTime = (time) => {
    const hour = formatTime(time.getHours())
    const minute = formatTime(time.getMinutes())
    return hour + minute
  }

  const formatTime = (time) => time < 9 ? '0' + time.toString() : time.toString()

  const handleTitleUpdate = (title) => setTitle(title)
  const handleNoteUpdate = (note) => setNote(note)
  const handleDateUpdate = (event, selectedValue) => {
    const selectedDate = selectedValue || date
    setDate(selectedDate)
    setIsDatePickerShown(false)
  }
  const handleTimeUpdate = (event, selectedValue) => {
    const selectedTime = selectedValue || time
    setTime(selectedTime)
    setIsTimePickerShown(false)
  }

  const handleCreateEvent = () => {
    setDateStr(showDate(date))
    setTimeStr(showTime(time))
    Events.createEvent(
      { userId, title, note, date: dateStr, time: timeStr },
      () => navigation.navigate('Show Events'),
      (error) => console.error(error)
    )
  }
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
            <Text style={styles.header}>New Event</Text>
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
              placeholder='Event title'
              placeholderTextColor='#aaa7b2'
              value={title}
              selectionColor='#8e8a98'
              maxLength={30}
              onChangeText={handleTitleUpdate}
            />
            <View style={styles.detail}>
              <View style={styles.date}>
                <TouchableOpacity onPress={showDatePicker}>
                  <Text style={styles.time}>{showDate(date)}</Text>
                </TouchableOpacity>
                {isDatePickerShown && (
                  <DateTimePicker
                    style={styles.day}
                    isVisible={isDatePickerShown}
                    testID='datePicker'
                    value={date}
                    mode='date'
                    display='spinner'
                    onChange={handleDateUpdate}
                  />
                )}
                <View style={styles.picker}>
                  <TouchableOpacity onPress={showTimePicker}>
                    <Text style={styles.time}>{showTime(time)}</Text>
                  </TouchableOpacity>
                  {isTimePickerShown && (
                    <DateTimePicker
                      testID='timePicker'
                      value={time}
                      mode='time'
                      is24Hour={false}
                      display='spinner'
                      onChange={handleTimeUpdate}
                    />
                  )}
                </View>
              </View>
            </View>
            <TextInput
              style={styles.field}
              placeholder='Event details'
              placeholderTextColor='#aaa7b2'
              value={note}
              selectionColor='#8e8a98'
              onChangeText={handleNoteUpdate}
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
    height: 40,
    marginTop: 10,
    marginHorizontal: 130,
    paddingVertical: 5,
  },
  date: {
    flexDirection: 'row',
    color: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    alignItems: 'center', 
  },
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
