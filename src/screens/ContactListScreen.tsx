/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useContact } from './hooks/useContact';
import ContactSearch from './componenets/ContactSearch';
import { useState } from 'react';
import { RootStackScreenProps } from '../navigations/type';
import { useNavigation } from '@react-navigation/native';

type Contact = {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  isFavorite: boolean;
};

type Props = RootStackScreenProps<'ContactListScreen'>;
type Navigation = Props['navigation'];

const ContactListScreen = () => {
  const { data, onStatusHandler } = useContact();
  const [filterContact, setFilterContact] = useState(data);

  const navigation = useNavigation<Navigation>();
  const sortAndGroupContacts = <T extends Contact>(
    contacts: T[] | undefined,
  ) => {
    const sortedContacts =
      contacts?.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) {
          return -1;
        } else if (!a.isFavorite && b.isFavorite) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      }) || [];

    const favoriteContacts = sortedContacts.filter(
      contact => contact.isFavorite,
    );
    const nonFavoriteContacts = sortedContacts.filter(
      contact => !contact.isFavorite,
    );

    const groupedContacts = nonFavoriteContacts.reduce((result, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      result[firstLetter] = result[firstLetter] || []; // Create an empty array if it doesn't exist
      result[firstLetter].push(contact); // Push the contact to the array
      return result;
    }, {} as Record<string, T[]>);

    const finalGroupedContacts = {
      Favorite: favoriteContacts,
      ...groupedContacts,
    };

    return Object.entries(finalGroupedContacts) as [string, T[]][];
  };

  const handleSearch = (input: string) => {
    const searchText = input.toLowerCase(); // Convert the input to lowercase to make it case-insensitive

    const filteredContacts = data?.filter(contact => {
      // Filter the contacts by name or phone number
      const lowerCaseName = contact.name.toLowerCase(); // Convert the name to lowercase to make it case-insensitive
      const phoneNumber = contact.phone; // Get the phone number

      return (
        lowerCaseName.includes(searchText) || phoneNumber.includes(searchText) // Check if the name or phone number includes the search text
      );
    });

    setFilterContact(filteredContacts || []); // Update the filtered contacts
  };

  const toggleStatusHandler = async (id: number, isFavorite: boolean) => {
    // Toggle the favorite status of the contact
    try {
      await onStatusHandler(id, isFavorite); // Call the onStatusHandler function from the useContact hook
    } catch (error) {
      console.error('Error updating contact:', error); // Log the error
    }
  };

  const handleEditContact = (id: number) => {
    // Navigate to the ContactEditScreen
    navigation.navigate('ContactEditScreen', { id }); // Pass the contact ID as a parameter
    console.log(id); // Log the contact ID
  };

  const groupedContacts = sortAndGroupContacts(filterContact || data); // Group the contacts alphabetically by the first letter of the name

  return (
    <View style={{ flex: 1, backgroundColor: '#020617' }}>
      <ContactSearch handleSearch={handleSearch} />
      <View style={{ padding: 10, backgroundColor: 'white' }}>
        <FlatList
          data={groupedContacts}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 0.5,
                gap: 5,
                padding: 10,
                margin: 5,
              }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>{item[0]}</Text>
              <FlatList
                data={item[1]}
                renderItem={({ item }) => (
                  <View style={{ padding: 10 }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                      onPress={() => handleEditContact(item.id)}>
                      <Text style={{ fontSize: 20 }}>{item.name}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          toggleStatusHandler(item.id, item.isFavorite)
                        }>
                        {item.isFavorite ? <Text>★</Text> : <Text>☆</Text>}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ContactListScreen;
