/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {useContact} from './hooks/useContact';
import Input from '../app/input';
import {useNavigation} from '@react-navigation/native';
import {RootStackScreenProps} from '../navigations/type';
import AddPhoto from './componenets/PhotoAdd';

type Props = RootStackScreenProps<'ContactListScreen'>;
type Navigation = Props['navigation'];
const AddContactScreen: React.FC = () => {
  const {control, addContactHandler, setValue} = useContact();
  const navigations = useNavigation<Navigation>();

  const handleAddContact = async () => {
    try {
      await addContactHandler();
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  };

  return (
    <ScrollView
      style={{
        padding: 10,
        margin: 10,
        gap: 10,
      }}>
      <View>
        <AddPhoto onImageSelected={photo => setValue('photo', photo!)} />
      </View>
      <View>
        <Text style={styles.text}>Name:</Text>
        <Input control={control} name="name" />

        <Text style={styles.text}>Email:</Text>
        <Input control={control} name="email" />

        <Text style={styles.text}>Phone:</Text>
        <Input control={control} name="phone" />

        <Text style={styles.text}>Address:</Text>
        <Input control={control} name="address" />

        <Button title="Add Contact" onPress={handleAddContact} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});
export default AddContactScreen;
