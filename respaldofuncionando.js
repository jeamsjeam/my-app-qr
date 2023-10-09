import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setQrData(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./logo.png')} style={styles.logo} />
      </View>
      {hasPermission === null ? (
        <Text>Requesting for camera permission</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={styles.qrScannerContainer}>
          {!scanned ? (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          ) : (
            <View style={styles.qrDataContainer}>
              <Text>{qrData}</Text>
              <TouchableOpacity onPress={handleScanAgain} style={styles.scanAgainButton}>
                <Text>Scan Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50, // Ajusta este valor para hacer el contenedor del logo más pequeño
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  qrScannerContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 400
  },
  qrDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAgainButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
});