import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      const filePath = data.uri;
      var date = new Date();
      var datestr = date.toLocaleDateString();
      datestr = datestr.replace('/', '').replace('/', '');
      var time = date.toTimeString();
      time = time.split(' ');
      time = time[0];
      time = time.replace(':', '');
      time = time.replace(':', '');
      var filename = datestr + time + '.jpg';

      const newFilePath = FileSystem.documentDirectory + '/CameraApp/' + filename;
      console.log(newFilePath);
      // await FileSystem.moveAsync({
      //   from: filePath,
      //   to: newFilePath,
      // })
      Alert.alert('Image Saved');
      // RNFS.moveFile(filePath, newFilePath)
      //   .then(() => {
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   })
      // setImage(data.uri);
      // const asset = await MediaLibrary.createAssetAsync(uri);
      // MediaLibrary.createAlbumAsync('Expo', asset)
      //   .then(() => {
      //     console.log('Album created!');
      //   })
      //   .catch(error => {
      //     console.log('err', error);
      //   });
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    // <View style={styles.container}>
    <View style={{ flex: 1 }}>
      < Camera ratio={'1:1'} style={styles.container} type={type} >
      </Camera >
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
