import React from 'react';
import {StyleSheet, View, Dimensions, Image, ActivityIndicator} from 'react-native';
import { Text } from 'native-base';
const {height} = Dimensions.get('screen');

class Configurations extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{height: 200, height:200}}
        >
          <Text>Tapin Test Project</Text>
        </View>
        <ActivityIndicator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height:height,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    }
});

export default Configurations;
