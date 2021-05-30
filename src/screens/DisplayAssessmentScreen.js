import React from 'react';
import {ScrollView, ActivityIndicator, ImageBackground, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, TextInput, Image} from 'react-native';

const DisplayAssessmentScreen=({ navigation })=>{
    const handleButton1=()=>{
        navigation.navigate("DisplayAllEventScreen")
    }
    const handleButton2=()=>{
        navigation.navigate("DisplayAllModulesScreen")
    }
    return(
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.TopView}>
                <Image
                  style = {{width: 50, height: 50}}
                  source = {require('C:/Users/Minh Duc/Desktop/projectpart2/assets/moonLogoImg.png')}
                />
                <Text style={styles.TopText}>  Assessments</Text>
            </View>
            <View style={styles.UpcomingEvents}>
             <TouchableOpacity onPress={handleButton1}>
                    <Text style={styles.Tittle}>Upcoming Events</Text>
             </TouchableOpacity>
             <Text style={styles.listBox}>Empty</Text>
            </View>
            <View style={styles.CurrentModules}>
                <TouchableOpacity onPress={handleButton2}>
                    <Text style={styles.Tittle}>Current Modules</Text>
                </TouchableOpacity>
                <Text style={styles.listBox}>Empty</Text>
            </View>
        </ScrollView>
    </SafeAreaView>

    )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'column',
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,
    backgroundColor: '#1e1632',
  },
  ImageBackground: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center"
  },
  button:{
    backgroundColor: '#000099',
    marginTop:50,
  },
  spinningButton:{
    bottom:150,
    position:'absolute',
  },
  TopView:{
    marginLeft: 10,
    flexDirection: 'row',
    alignItems:'flex-start',
    justifyContent: 'flex-start',
  },
  TopText:{
   marginTop:5,
   fontWeight: 'bold',
   fontSize: 30,
   color: 'white',
  },
  UpcomingEvents:{
    marginLeft:70,
    marginTop:40,
    height: 300,
    flex:1,
  },
  CurrentModules:{
    marginLeft:70,
    marginTop: 20,
  },
  Tittle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  listBox:{
    marginTop:10,
    borderRadius: 5,
    borderWidth:1,
    height: 30,
    width:200,
    fontSize:20,
    color:'white',
    backgroundColor: '#8e8a98',
  }
})

export default DisplayAssessmentScreen