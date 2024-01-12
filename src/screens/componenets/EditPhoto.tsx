import  { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';


type EditPhotoProps = {
  photo: string | null;
  onPhotoUpdated: (photo: string | null) => void;
  name : string
};

const EditPhoto: FC<EditPhotoProps> = ({ photo, onPhotoUpdated, name }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChooseImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 400,
        mediaType: 'photo',
        includeBase64: true,
      });

      if (image) {
        const base64Image = await getBase64FromFilePath(image.path);
        const imageData = `data:${image.mime};base64,${base64Image}`;
        setSelectedImage(imageData);
        onPhotoUpdated(imageData);


      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  const getBase64FromFilePath = async (filePath: string): Promise<string> => {
    try {
      const fileContent = await RNFS.readFile(filePath, 'base64');
      return fileContent;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onPhotoUpdated(null);

  }


  useEffect(() => {
    setSelectedImage(photo);
  }, [photo]);


  

  return (
    <View style={styles.container}>
      {!isEditing && (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          {selectedImage ? (
            <ImageBackground source={{ uri: selectedImage }} style={styles.avatarContainer} >
              <Text style={styles.avatarText}> {name}  </Text>
            </ImageBackground>
          ) : (
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {photo? photo[0].toUpperCase() : 'Add Photo'}

              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      {isEditing && (
        <View style={styles.editOptions}>
          <TouchableOpacity onPress={handleChooseImage}>
            <View style={styles.editOption}>
              <Text style={styles.editOptionText}>Choose Photo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsEditing(false)}>
            <View style={styles.editOption}>
              <Text style={styles.editOptionText}>Cancel</Text>
            </View>
          </TouchableOpacity>

          {selectedImage && (
            <TouchableOpacity onPress={handleRemoveImage}>
              <View style={styles.editOption}>

                <Text style={styles.editOptionText}>Remove</Text>

              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 350,
    height: 350,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 25,
    lineHeight: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf : 'flex-start',
    //I want the text to be on the bottom left corner of the image
    position : 'absolute',
    bottom : 0,

    
  },
  editOptions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editOption: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  editOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditPhoto;
