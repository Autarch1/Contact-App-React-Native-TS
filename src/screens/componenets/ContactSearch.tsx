/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {RootStackScreenProps} from '../../navigations/type';
import {useNavigation} from '@react-navigation/native';
import {AddContact} from '../../assets/svg';

type ContactSearchProps = {
  handleSearch: (input: string) => void;
};

type Props = RootStackScreenProps<'ContactListScreen'>;
type Navigation = Props['navigation'];

const ContactSearch: FC<ContactSearchProps> = ({handleSearch}) => {
  const navigation = useNavigation<Navigation>();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.contactInput}
        placeholder="Search Contact with name"
        onChangeText={input => {
          handleSearch(input);
        }}
      />

      <AddContact
        width={100}
        height={50}
        onPress={() => {
          navigation.navigate('ContactAddScreen');
          console.log('Pressed');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    padding: 20,
  },
  contactInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    width: '80%',
  },
});

export default ContactSearch;
