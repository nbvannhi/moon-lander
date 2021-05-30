import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default class ActionButton extends Component {
  state = {
    animation: new Animated.Value(0),
  };
  toggleOpen = () => {

    if (this._open) {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

    } else {

      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    this._open = !this._open

  };
  render() {
    const { navigation:navigate } = this.props;
    const printInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50],
    });
    const saveInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 50, 100],
    });

    const printStyle = {
      transform: [
        {
          translateY: printInterpolate,
        },
      ],
    };

    const saveStyle = {
      transform: [
        {
          translateY: saveInterpolate,
        },
      ],
    };
    return (
      <View style = {styles.container}>
        <Animated.View style = {styles.background}>
          <TouchableWithoutFeedback onPress = {()=> Alert.alert('Hello')}>
            <Animated.View style={[styles.button, saveStyle]}>
                <Image
                    style={{height:25, width:25}}
                    source={require("../../assets/home.jpg")}
                />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress = {()=>this.props.navigation.navigate("Show Menu")}>
            <Animated.View style={[styles.button, printStyle]}>
                <Image
                    style={{height:25, width:25}}
                    source={require("../../assets/logout.jpg")}
                />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleOpen()}>
            <Animated.View style={styles.button}>
              <Image
                style={{height:50, width:50}}
                resizeMode="contain"
                source={require('../../assets/images/avatar-sample.png')}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
       </View>
    );
  }
}

const styles=StyleSheet.create({
    container:{
        flex : 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 30,
        marginRight: 30,
        marginLeft: 10,
    },
    mainButton:{
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        width: 50,
        height: 50,
    },
    logOut:{
        alignItems: 'center',
        alignSelf: 'center',
    },
  button: {
    marginTop: 5,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }

})
