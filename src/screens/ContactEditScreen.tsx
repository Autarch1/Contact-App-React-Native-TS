// Import necessary components and hooks
import React, {useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {useContact} from './hooks/useContact';
import Input from '../app/input';
import {RootStackScreenProps} from '../navigations/type';
import { useNavigation } from '@react-navigation/native';

type Props = RootStackScreenProps<'ContactListScreen'>;
type Navigation = Props['navigation'];


const EditContactScreen = ({route}: {route: any}) => {
  const {id} = route.params;
  const {control, setValue, watch, reset, data, updateContatHandler} =
    useContact();
    const navigations = useNavigation<Navigation>();
  const selectedContact = data?.find(contact => contact.id === id);

  useEffect(() => {
    if (selectedContact) {
      Object.entries(selectedContact).forEach(([key, value]) => {
        setValue(key as any, value);
      });
    }
  }, [selectedContact, setValue]);

  const handleUpdateContact = async () => {
    try {
      await updateContatHandler();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        gap: 10,
        marginVertical: 100,
      }}>
      <Text style={styles.text}>Edit Your Name : </Text>
      <Input control={control} name="name" />
      <Text style={styles.text}>Edit Your Email : </Text>
      <Input control={control} name="email" />
      <Text style={styles.text}>Edit Your Phone : </Text>
      <Input control={control} name="phone" />
      <Text style={styles.text}>Edit Your Address : </Text>
      <Input control={control} name="address" />
      <Button title="Update Contact" onPress={handleUpdateContact} />
      <Button
        title="Cancel"
        onPress={() => navigations.navigate('ContactListScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    text : {
        fontSize : 20,
        fontWeight : 'bold'
    }
});

export default EditContactScreen;
