import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useContact} from './hooks/useContact';
import Input from '../app/input';
import {RootStackScreenProps} from '../navigations/type';
import {useNavigation} from '@react-navigation/native';
import EditPhoto from './componenets/EditPhoto';

type Props = RootStackScreenProps<'ContactListScreen'>;
type Navigation = Props['navigation'];
type props = {
  params: {
    id: number;
  };
};

const EditContactScreen = ({route}: {route: props}) => {
  const {id} = route.params;
  const {control, setValue, data, updateContatHandler, onDeleteHandler} =
    useContact();
  const navigations = useNavigation<Navigation>();
  const selectedContact = data?.find(contact => contact.id === id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (selectedContact) {
      Object.entries(selectedContact).forEach(([key, value]) => {
        setValue(key as any, value);
      });
    }
  }, [selectedContact, setValue]);
  const handleUpdateContact = async () => {
    try {
      setIsLoading(true);
      await updateContatHandler();
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Error updating contact. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async () => {
    try {
      setIsLoading(true);
      await onDeleteHandler(id);
      navigations.navigate('ContactListScreen');
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Error deleting contact. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            width: 350,
            height: 350,
            backgroundColor: 'lightgrey',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EditPhoto
            photo={selectedContact?.photo!}
            onPhotoUpdated={photo => setValue('photo', photo!)}
            name={selectedContact?.name!}
          />
        </View>
        <Text style={styles.text}> Name: </Text>
        <Input control={control} name="name" />
        <Text style={styles.text}> Email: </Text>
        <Input control={control} name="email" />
        <Text style={styles.text}> Phone: </Text>
        <Input control={control} name="phone" />
        <Text style={styles.text}> Address: </Text>
        <Input control={control} name="address" />
        {isLoading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#0000ff"
          />
        ) : (
          <>
            {error && <Text style={styles.error}>{error}</Text>}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Button title="Update Contact" onPress={handleUpdateContact} />

              <Button title="Delete" onPress={handleDeleteContact} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    gap: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  loading: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
});

export default EditContactScreen;
