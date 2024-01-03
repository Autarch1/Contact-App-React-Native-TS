import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useContact } from './hooks/useContact';
import ContactSearch from './componenets/ContactSearch';
import { useState } from 'react';
import { RootStackScreenProps } from '../navigations/type';
import { useNavigation } from '@react-navigation/native';

type Props = RootStackScreenProps<'ContactListScreen'>;
type Navigation = Props['navigation'];

const ContactListScreen = () => {
  const { data, onStatusHandler } = useContact();
  const [filterContact, setFilterContact] = useState(data);

  const navigation = useNavigation<Navigation>();

  const sortAndGroupContacts = (contacts: any[] | undefined) => {
    const sortedContacts =
      contacts?.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) {
          return -1; // A is favorite, but B is not, so A comes first
        } else if (!a.isFavorite && b.isFavorite) {
          return 1; // B is favorite, but A is not, so B comes first
        } else {
          return a.name.localeCompare(b.name); // Both have the same favorite status, sort by name
        }
      }) || [];
  
    const groupedContacts = sortedContacts.reduce((result, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      result[firstLetter] = result[firstLetter] || [];
      result[firstLetter].push(contact);
      return result;
    }, {});
  
    return Object.entries(groupedContacts);
  };
  
  const handleSearch = (input: string) => {
    const searchText = input.toLowerCase();

    const filteredContacts = data?.filter(contact => {
      const lowerCaseName = contact.name.toLowerCase();
      const phoneNumber = contact.phone;

      return (
        lowerCaseName.includes(searchText) || phoneNumber.includes(searchText)
      );
    });

    setFilterContact(filteredContacts || []);
  };

  const toggleStatusHandler = async (id: number, isFavorite : boolean) => {
    try {
      await onStatusHandler(id, isFavorite);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }
  
  const handleEditContact = (id: number) => {
    navigation.navigate('ContactEditScreen', { id });
    console.log(id);
  };

  const groupedContacts = sortAndGroupContacts(filterContact || data);

  return (
    <View style={{flex : 1}}>
      <ContactSearch handleSearch={handleSearch} />
      <View style={{ padding: 10 }}>
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
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {item[0]}
              </Text>
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
                        onPress={() => toggleStatusHandler(item.id, item.isFavorite)}>
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
