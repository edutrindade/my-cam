import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Slider } from '@rneui/themed';

import { styles } from './styles';

export default function App() {
  const [cameraRef, setCameraRef] = useState(null);
  const [exposure, setExposure] = useState(0); // Tempo de exposição
  const [iso, setIso] = useState(100); // ISO

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de câmera não concedida');
    }
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = {
        quality: 1,
        base64: true,
        exposure: exposure, // Configura o tempo de exposição
        iso: iso, // Configura o ISO
      };
      const data = await cameraRef.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const incrementExposure = async (quantity: number) => {
    if (cameraRef) {
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
        <Camera style={{ flex: 1 }} ref={(ref) => setCameraRef(ref)} />

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
