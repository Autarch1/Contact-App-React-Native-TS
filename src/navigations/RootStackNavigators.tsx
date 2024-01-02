import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactListScreen from "../screens/ContactListScreen";
import { RootStackParamList } from "./type";
import AddContactScreen from "../screens/ContactAddScreen";



const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigators = () => {
    return (
        <Stack.Navigator
        screenOptions={{headerShown : false}}
        initialRouteName="ContactListScreen"
        >
            <Stack.Screen name="ContactListScreen" component={ContactListScreen} />
            <Stack.Screen name="ContactAddScreen" component={AddContactScreen} />
        </Stack.Navigator>
    )
}