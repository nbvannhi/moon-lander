import React, { useEffect, useState } from 'react'
import {
  Image, 
  ImageBackground, 
  Modal, 
  SafeAreaView, 
  ScrollView, 
  SectionList, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View 
} from 'react-native'
import { Divider } from 'react-native-elements'

import * as Authentication from '../../api/auth'
import * as Modules from '../../api/modules'
import * as Events from '../../api/events'

export default ({ navigation }) => {
  const userId = Authentication.getCurrentUserId()
  
  const [events, setEvents] = useState({})
  const [modules, setModules] = useState({})
  const [eventList, setEventList] = useState([])
  const [moduleList, setModuleList] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isEventVisible, setIsEventVisible] = useState(false)

  useEffect(() => {
    return Modules.subscribe(userId, setModules)
  }, [])
  useEffect(() => {
    return Events.subscribe(userId, setEvents)
  }, [])

  useEffect(() => {
    if (modules) {
      const modulesTemp = []
      const modulesArray = Object.values(modules)
      if (modulesArray.length > 0) modulesTemp.push({ data: modulesArray })
      setModuleList(modulesTemp)
    }
  }, [modules])
  useEffect(() => {
    if (events) {
      const eventsTemp = []
      const eventsArray = Object.values(events)
      if (eventsArray.length > 0) eventsTemp.push({ data: eventsArray })
      setEventList(eventsTemp)
    }
  }, [events])


  const handleShowModal = () => setIsVisible(true)
  const handleCloseModal = () => setIsVisible(!isVisible)

  const handleShowEventModal = () => setIsEventVisible(true)
  const handleCloseEventModal = () => setIsEventVisible(!isEventVisible)

  const handleEditEvent = (eventId) => navigation.push('Edit Event', { eventId })
  const handleDeleteEvent = (eventId) => Events.deleteEvent(
    { userId, eventId },
    () => setIsVisible(false),
    (error) => console.error(error)
  )



  const handleEditModule = (moduleId) => navigation.push('Edit Module', { moduleId })
  const handleDeleteModule = (moduleId) => Modules.deleteModule(
    { userId, moduleId }, 
    () => setIsVisible(false), 
    (error) => console.error(error)
  )
  
  const handleShowEvents = () => navigation.navigate('Show Events')
  const handleShowModules = () => navigation.navigate('Show Modules')
  const handleShowNavigation = () => navigation.navigate('Show Menu')

  const renderModuleList = ({ item }) => {
    return (
      <View style={{ flex: 0.92 }}>
        <Modal 
          animationType='fade'
          transparent={true}
          visible={isVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.center}>
            <View style={styles.detail}>
              <Text style={styles.name}>
                Module details such as name, code and class schedule will be displayed here.
                You can choose to edit or remove a module from here too.
              </Text>
              <View style={styles.button}>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Text style={styles.text}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditModule(item.id)}>
                  <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteModule(item.id)}>
                  <Text style={styles.text}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.item} onPress={handleShowModal}>
          <Text style={styles.code}>{item.code}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderEventList = ({ item }) => {
    return (
      <View style={{ flex: 0.92 }}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={isEventVisible}
          onRequestClose={handleCloseEventModal}
        >
          <View style={styles.center}>
            <View style={styles.detail}>
              <Text style={styles.name}>
                Events details such as event title, note, date and time will be displayed here.
                You can choose to edit or remove an event from here too.
              </Text>
              <View style={styles.button}>
                <TouchableOpacity onPress={handleCloseEventModal}>
                  <Text style={styles.text}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditEvent(item.id)}>
                  <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
                  <Text style={styles.text}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.item} onPress={handleShowEventModal}>
          <Text style={styles.code}>{item.code}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
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
              <Text style={styles.header}>Assessment</Text>
            </View>
          </View>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleShowEvents}>
              <Text style={styles.title}>Upcoming Events</Text>
            </TouchableOpacity>
            <SectionList 
              style={styles.list}
              sections={eventList}
              renderItem={renderEventList}
              ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            />       
          </View>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleShowModules}>
              <Text style={styles.title}>Current Modules</Text>
            </TouchableOpacity>
            <SectionList 
              style={styles.list}
              sections={moduleList}
              renderItem={renderModuleList}
              ItemSeparatorComponent={() => <Divider style={styles.divider} />}
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
    paddingVertical: 20, 
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
  list: {
    flexDirection: 'column', 
    backgroundColor: '#565065', 
    borderRadius: 5,
    width: 250, 
    marginTop: 10, 
    marginHorizontal: 20, 
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
  title: {
    color: '#ffffff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    lineHeight: 20, 
    marginHorizontal: 20, 
  }, 
  item: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    paddingLeft: 10, 
    paddingVertical: 10, 
    textAlign: 'left', 
  }, 
  code: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    lineHeight: 25, 
    textAlign: 'left',
  }, 
  name: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'normal', 
    lineHeight: 20, 
    textAlign: 'left', 
  }, 
  divider: {
    height: 1, 
    backgroundColor: '#8e8a98', 
  }, 
  center: {
    flex: 0.92, 
    justifyContent: 'center', 
    alignSelf: 'center', 
  }, 
  detail: {
    flexDirection: 'column',
    backgroundColor: '#8e8a98',  
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 300, 
    textAlign: 'left',
    alignSelf: 'center',  
    margin: 20, 
    paddingHorizontal: 10, 
    paddingVertical: 10, 
  }, 
  button: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  }, 
  text: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    lineHeight: 30, 
    textAlign: 'center', 
    alignSelf: 'center', 
  }, 
})