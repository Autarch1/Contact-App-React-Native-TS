import React from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';
import { useContact } from './hooks/useContact';
import Input from '../app/input';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../navigations/type';

type Props = RootStackScreenProps<'ContactListScreen'>;
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
    <View style={{
    padding : 10,
    margin : 10,
    gap : 10,
    marginVertical : 100
    }}>
      <View style={{alignItems : 'flex-start', borderWidth : 1, borderRadius : 20, width : '10%', marginVertical : 20}}>
      <Button
        title="<"
        onPress={() => navigations.navigate('ContactListScreen')}
      />
      </View>
      <View>
      <Text style={styles.text}>Name:</Text>
      <Input 
        control={control}
        name='name'
      />

      <Text style={styles.text}>Email:</Text>
      <Input
        control={control}
        name='email'
      />

      <Text style={styles.text}>Phone:</Text>
      <Input
        control={control}
        name='phone'
      />

      <Text  style={styles.text}>Address:</Text>
      <Input
        control={control}
        name='address'
      />

      <Button title="Add Contact" onPress={handleAddContact} />

      
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text  : {
    fontSize : 18,
  }
})
export default AddContactScreen;
