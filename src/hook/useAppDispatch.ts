import {useDispatch} from 'react-redux';
import {AppDispatch} from '../screens/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
