import { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";



type ContactSearchProps = {
    handleSearch : (input : string ) => void;
}

const ContactSearch : FC<ContactSearchProps> = ({handleSearch : handleSearch}) =>{
    return (
        <View>
                <TextInput 
                style={styles.contact}
                placeholder="Search Contact with name" 
                onChangeText={(input) => {
                    handleSearch(input);
                }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    contact : {
        backgroundColor: 'white',
        padding: 10,
        margin: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'  
    }
})

export default ContactSearch;