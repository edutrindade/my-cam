import 'react-native-reanimated';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Slider } from '@rneui/themed';

import { styles } from './styles';

export default function App() {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back')
  const [imageSource, setImageSource] = useState<string>(''); // Imagem capturada
  const [exposure, setExposure] = useState(0); // Tempo de exposição
  const [iso, setIso] = useState(100); // ISO

  const format = useCameraFormat(device, [
    { photoHDR: true },
    { videoHDR: true },
  ])

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log('newCameraPermission', newCameraPermission);
    }
    getPermission();
  }, []);

  const takePicture = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      console.log('path', photo.path);
    }
  }

  // const takePicture = async () => {
  //   if (cameraRef) {
  //     const options = {
  //       quality: 1,
  //       base64: true,
  //       exposure: exposure, // Configura o tempo de exposição
  //       iso: iso, // Configura o ISO
  //     };
  //     const data = await cameraRef.takePictureAsync(options);
  //     console.log(data.uri);
  //   }
  // };

  const incrementExposure = async (quantity: number) => {
    if (camera) {
      setExposure(exposure + quantity);
    }
  }

  const decrementExposure = async (quantity: number) => {
    if (exposure > 0) {
      if (exposure - quantity < 0) {
        setExposure(0);
      } else {
        setExposure(exposure - quantity);
      }
    }
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>

        <Camera
          ref={camera}
          style={styles.cameraPreview}
          photo={true}
          device={device}
          isActive={true}
          format={format}
          hdr={true}
        />


        <View style={styles.controlsContainer}>
          <Text style={styles.controlText}>Tempo de Exposição</Text>

          <View style={styles.exposure}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => decrementExposure(0.25)}
              onLongPress={() => decrementExposure(1.5)}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={[styles.controlText, { padding: 5, marginTop: 5 }]}>{exposure.toFixed(2)}</Text>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => incrementExposure(0.25)}
              onLongPress={() => incrementExposure(1.5)}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.controlText}>ISO: {iso}</Text>

          <Slider
            value={iso}
            onValueChange={(value) => setIso(value)}
            minimumValue={100}
            maximumValue={500}
            step={10}
            thumbStyle={{ height: 20, width: 20 }}
            thumbProps={{
              children: (
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 20 / 2,
                    backgroundColor: '#FFF',
                    borderColor: 'green',
                    borderWidth: 2,
                  }}
                />
              ),
            }}
            style={{ width: '50%' }}
          />

          <TouchableOpacity
            onPress={takePicture}
          >
            <View style={styles.capture}>
              <Icon name="camera" size={25} color='rgba(0, 0, 0, 0.75)' />
            </View>
          </TouchableOpacity>
        </View>
      </View >
    </SafeAreaProvider>
  );
}
