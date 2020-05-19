import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Configurations from './Configurations';
import Agenda from './Agenda';

const MainNavigator = createStackNavigator(
  {
    Configurations: {screen: Configurations},
    Agenda: {screen: Agenda},
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Routes = createAppContainer(MainNavigator);

export default Routes;
