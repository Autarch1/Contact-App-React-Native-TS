/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  addContact,
  deleteContact,
  editContact,
  favoriteStatusContact,
  getContacts,
} from '../../api/contact';
import z from 'zod';
import {queryClient} from '../../utils/queryClient';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {RootStackScreenProps} from '../../navigations/type';
import {useNavigation} from '@react-navigation/native';
const schema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email({message: 'Please enter a valid email address'}),
  phone: z
    .string({required_error: 'Phone number is required'})
    .min(8, {message: 'Phone number must be at least 8 numbers'})
    .max(15, {message: 'You cant add more than 15 numbers '})
    .regex(/^[0-9]+$/, {message: 'Phone number must be numeric'}),
  address: z.string(),
  isFavorite: z.boolean(),
});

type FormField = z.infer<typeof schema>;

type Props = RootStackScreenProps<'ContactAddScreen'>;
type Navigation = Props['navigation'];
export const useContact = () => {
  const navigation = useNavigation<Navigation>();

  const {control, handleSubmit, reset, setValue, watch} = useForm<FormField>({
    defaultValues: {
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      isFavorite: false,
    },
    resolver: zodResolver(schema),
  });
  const {data} = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const {mutateAsync} = useMutation({
    mutationKey: ['addContact'],
    mutationFn: addContact,
    onError: error => {
      console.log(error);
    },
    onSuccess: async data => {
      return await queryClient.invalidateQueries({queryKey: ['contacts']});
    },
  });

  const {mutate} = useMutation({
    mutationKey: ['editContact'],
    mutationFn: editContact,
    onError: error => {
      console.log(error);
    },
    onSuccess: async data => {
      return await queryClient.invalidateQueries({queryKey: ['contacts']});
    },
  });

  const {mutateAsync: deleteContactById} = useMutation({
    mutationKey: ['deleteContact'],
    mutationFn: deleteContact,
    onError: error => {
      console.log(error);
    },
    onSuccess: async data => {
      return await queryClient.invalidateQueries({queryKey: ['contacts']});
    },
  });

  const onDeleteHandler = async (id: number) => {
    return deleteContactById(id);
  };

  const onSubmitHandler: SubmitHandler<FormField> = async value => {
    const id = Math.floor(Math.random() * 100000) + 1;

    try {
      await mutateAsync({...value, id});
      reset();
      navigation.navigate('ContactListScreen');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const onEidtHandler: SubmitHandler<FormField> = async value => {
    try {
      await mutate(value);
      navigation.navigate('ContactListScreen');
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  const {mutateAsync: statusContact} = useMutation({
    mutationKey: ['favoriteContact'],
    mutationFn: favoriteStatusContact,
    onError: error => {
      console.log(error);
    },
    onSuccess: async data => {
      return await queryClient.invalidateQueries({queryKey: ['contacts']});
    },
  });

  const onStatusHandler = async (id: number, isFavorite: boolean) => {
    try {
      await statusContact({id, isFavorite});
    } catch (error) {
      console.error('Error status contact:', error);
    }
  };

  const addContactHandler = handleSubmit(onSubmitHandler);
  const updateContatHandler = handleSubmit(onEidtHandler);
  return {
    control,
    addContactHandler,
    setValue,
    watch,
    data,
    reset,
    updateContatHandler,
    onDeleteHandler,
    onStatusHandler,
  };
};
