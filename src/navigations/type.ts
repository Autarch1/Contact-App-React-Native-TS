import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList<T = any> = {
  ContactListScreen: undefined;
  ContactAddScreen: undefined;
  ContactEditScreen: {id: number};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
