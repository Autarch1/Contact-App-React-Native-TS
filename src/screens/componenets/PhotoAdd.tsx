import React, {FC, useState} from 'react';
import {View, Button, Image, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import images from '../../assets/image';

type Props = {
  onImageSelected: (photo: string | null) => void;
};

const AddPhoto: FC<Props> = ({onImageSelected}) => {
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
        onImageSelected(imageData);
      }
    } catch (error) {
      console.error(error);
      throw error;
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
    onImageSelected(null);
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{uri: selectedImage}} style={styles.image} />
          <Button title="Remove" onPress={handleRemoveImage} />
        </View>
      )}
      {!selectedImage && (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleChooseImage}>
          <Image source={images.defaultImage} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {},
  image: {
    width: 400,
    height: 250,
    borderRadius: 10,
  },
});

export default AddPhoto;
