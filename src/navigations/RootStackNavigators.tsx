/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './type';
import AddContactScreen from '../screens/ContactAddScreen';
import ContactListScreen from '../screens/ContactListScreen';
import ContactEditScreen from '../screens/ContactEditScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigators = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ContactListScreen">
      <Stack.Screen name="ContactListScreen" component={ContactListScreen} />
      <Stack.Screen name="ContactAddScreen" component={AddContactScreen} />
      <Stack.Screen name="ContactEditScreen" component={ContactEditScreen} />
    </Stack.Navigator>
  );
};
