import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Touchable } from 'react-native';
import { useContact } from './hooks/useContact';
import Input from '../app/input';
import { RootStackScreenProps } from '../navigations/type';
import { useNavigation } from '@react-navigation/native';


type Props = RootStackScreenProps<'ContactAddScreen'>;
type Navigation = Props['navigation'];
const AddContactScreen = () => {
  const { control, addContactHandler, setValue, reset } = useContact();
  const navigations = useNavigation<Navigation>();

  const handleAddContact = async () => {
    try {
      await addContactHandler();
    } catch (error) {
      console.error('Error adding contact:', error);
    }

  };

  return (
    <View style={{backgroundColor : 'white',
    padding : 10,
    margin : 10,
    gap : 10,
    marginVertical : 100
    }}>
      <View>
      <Text>Name:</Text>
      <Input 
        control={control}
        name='name'
      />

      <Text>Email:</Text>
      <Input
        control={control}
        name='email'
      />

      <Text>Phone:</Text>
      <Input
        control={control}
        name='phone'
      />

      <Text>Address:</Text>
      <Input
        control={control}
        name='address'
      />

      <Button title="Add Contact" onPress={handleAddContact} />

      <Button
        title="Cancel"
        onPress={() => navigations.navigate('ContactListScreen')}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text  : {
    color : 'white',
    fontSize : 20,
  }
})
export default AddContactScreen;
