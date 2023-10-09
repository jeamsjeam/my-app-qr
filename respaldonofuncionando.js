import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { db, setupDatabase } from './databases'; // Asegúrate de que la ruta sea correcta


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [dbInitialized, setDbInitialized] = useState(false); // Nuevo estado para rastrear inicialización de la base de datos

  useEffect(() => {    
   
    (async () => {     
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');     
      setupDatabase(); // Llama a setupDatabase para asegurar que la tabla esté creada
      setDbInitialized(true); // Establece el estado como inicializado después de inicializar la base de datos
    })();
  }, []);

  const searchEmployeeByNumber = (employeeNumber) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM employees WHERE numero_personal = ?',
        [employeeNumber],
        (_, { rows }) => {
          if (rows.length > 0) {
            const employee = rows.item(0);
            setEmployeeData({ cédula: employee.cedula, nombre: employee.nombre });
          } else {
            setEmployeeData(null);
          }
        },
        (_, error) => {
          console.error(error);
        }
      );
    });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
    searchEmployeeByNumber(data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setQrData(null);
    setEmployeeData(null);
  };

  if (!dbInitialized) {
    return (
      <View style={styles.container}>
        <Text>Initializing database...</Text>
      </View>
    );
  }

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
              {employeeData ? (
                <Text>
                  Cédula: {employeeData.cédula}
                  {'\n'}
                  Nombre: {employeeData.nombre}
                </Text>
              ) : (
                <Text>No se encontró el empleado</Text>
              )}
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
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  qrScannerContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 400,
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
