import {FlatList, Text, View} from 'react-native';
import {useContact} from './hooks/useContact';
import ContactSearch from './componenets/ContactSearch';
import { useState} from 'react';
import {RootStackScreenProps} from '../navigations/type';
import {useNavigation} from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { AddContact } from '../assets/svg';

type Props = RootStackScreenProps<'ContactListScreen'>;
type Navigation = Props['navigation'];
const ContactListScreen = () => {
  const {control, reset, setValue, watch, data} = useContact();
  const [filterContact, setFilterContact] = useState(data);



  const navigation = useNavigation<Navigation>();

  const sortAndGroupContacts = (contacts: any[] | undefined) => {
    const sortedContacts =
      contacts?.sort((a, b) => a.name.localeCompare(b.name)) || [];

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
      const phoneNumberString = contact.phone.toString();
  
      return (
        lowerCaseName.includes(searchText) ||
        phoneNumberString.includes(searchText)
      );
    });
  
    setFilterContact(filteredContacts || []);
  };
  

  const groupedContacts = sortAndGroupContacts(filterContact || data);

  return (
    <View>
      <ContactSearch handleSearch={handleSearch} />
      <View style={{padding: 10}}>
        {groupedContacts.map(([letter, contacts]) => (
          <View
            key={letter}
            style={{
              borderBottomWidth: 0.5,
              gap: 5,
              padding: 10,
              margin: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{letter}</Text>
            <FlatList
              data={contacts}
              renderItem={({item}) => {
                return (
                  <View style={{padding: 10}}>
                    <Text>{item.name}</Text>
                  </View>
                );
              }}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        ))}
      </View>
      <View style={{alignItems : 'flex-end'}}>
        <AddContact width={100} height={50}  onPress={() => {
          navigation.navigate('ContactAddScreen');
          console.log("Pressed");
        }
        }/>
      </View>
    </View>
  );
};

export default ContactListScreen;
