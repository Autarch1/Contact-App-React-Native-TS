/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './type';
import AddContactScreen from '../screens/ContactAddScreen';
import ContactListScreen from '../screens/ContactListScreen';
import ContactEditScreen from '../screens/ContactEditScreen';
import {Text, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigators = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ContactListScreen">
      <Stack.Screen name="ContactListScreen" component={ContactListScreen} />
      <Stack.Screen
        name="ContactAddScreen"
        component={AddContactScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  marginLeft: 10,
                }}>
                <Text>Back</Text>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="ContactEditScreen"
        component={ContactEditScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  marginLeft: 10,
                }}>
                <Text>Back</Text>
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};
