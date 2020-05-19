import React from 'react';
import {StyleSheet} from 'react-native';
import Splash from "./src/Splash";
import Routes from './src/Routes';

class App extends React.Component {
  state = {
    isTrue: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({isTrue: true});
    }, 5000);
  }
  render() {
    
    return this.state.isTrue? <Routes />:<Splash/>;
  }
}

const styles = StyleSheet.create({});

export default App;
