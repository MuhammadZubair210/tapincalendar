
import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const testIDs = require('../testIDs');

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar',
  ], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '314330890074-he3m85t1ocbcktir0qdiulro1vlrjs7l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '314330890074-he3m85t1ocbcktir0qdiulro1vlrjs7l.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    // let postsUrl =
    // 'https://www.googleapis.com/calendar/v3/calendars/danishtahir21000@gmail.com/events?key=AIzaSyDp-cpdNZ1ZdwPfx2MUySssock8RtcKltk';

    // let postsUrl =
    // 'https://www.googleapis.com/calendar/v3/calendars/danishtahir21000@gmail.com/events?key=AIzaSyDp-cpdNZ1ZdwPfx2MUySssock8RtcKltk';

    // fetch(postsUrl)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //   });

    fetch(
      'https://www.googleapis.com/calendar/v3/calendars?key=AIzaSyDp-cpdNZ1ZdwPfx2MUySssock8RtcKltk',
      {
        method: 'POST',
        body: JSON.stringify({summary: 'asdfasd'}),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        response.status; //=> number 100–599
        response.statusText; //=> String
        response.headers; //=> Headers
        response.url; //=> String
        console.log(response.text());
        return response.text();
      })
      .then((s) => console.log(s))
      .catch((e) => console.log(e));
    // , (error)=> {
    //   console.log(error.message) //=> String
    // })
  }

  

  render() {
    return (
      <View style={{flex: 1}}>

        <Agenda
          testID={testIDs.agenda.CONTAINER}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2017-05-16'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // time_proportional={true}
        />
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
