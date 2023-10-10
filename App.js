import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const EMPLEADOS = [
  {
    numero_empleado: 196964,
    nombre: 'NELSON ALEXANDER CORREA ADAME',
    cedula: '9.460.433',
    asistencia: 0,
  },
  {
    numero_empleado: 125599,
    nombre: 'MARY ELIZABETH CRISTANCHO',
    cedula: '9.461.301',
    asistencia: 0,
  },
  {
    numero_empleado: 125730,
    nombre: 'FABIOLA JOSEFA GARCIA GAMBOA',
    cedula: '11.109.034',
    asistencia: 0,
  },
  {
    numero_empleado: 125734,
    nombre: 'RONALD HOSLEY NIÑO GONZALEZ',
    cedula: '11.110.979',
    asistencia: 0,
  },
  {
    numero_empleado: 125740,
    nombre: 'NELLY LOURDES RAMIREZ RAMIREZ',
    cedula: '11.114.297',
    asistencia: 0,
  },
  {
    numero_empleado: 125849,
    nombre: 'ROBER ALFONSO RAMIREZ',
    cedula: '12.633.060',
    asistencia: 0,
  },
  {
    numero_empleado: 125882,
    nombre: 'ENWER JOSE SAYAGO GONZALEZ',
    cedula: '13.038.718',
    asistencia: 0,
  },
  {
    numero_empleado: 196968,
    nombre: 'EGLEE JOSEFINA TORRES AVILA',
    cedula: '14.051.032',
    asistencia: 0,
  },
  {
    numero_empleado: 183576,
    nombre: 'LISBETH QUINTERO DE NIÑO',
    cedula: '14.217.918',
    asistencia: 0,
  },
  {
    numero_empleado: 125996,
    nombre: 'CRISTIAM LEANDRO OSPINA TRIANA',
    cedula: '14.776.629',
    asistencia: 0,
  },
  {
    numero_empleado: 127653,
    nombre: 'YURI VANESSA CALDERON BELTRAN',
    cedula: '14.776.952',
    asistencia: 0,
  },
  {
    numero_empleado: 126094,
    nombre: 'ANGEL FRANCISCO SAYAGO CRISTANCHO',
    cedula: '17.863.570',
    asistencia: 0,
  },
  {
    numero_empleado: 196965,
    nombre: 'ENDER GOMEZ SUAREZ',
    cedula: '19.540.873',
    asistencia: 0,
  },
  {
    numero_empleado: 185847,
    nombre: 'MARCOS DANIEL SUAREZ VERGARA',
    cedula: '20.617.778',
    asistencia: 0,
  },
  {
    numero_empleado: 196972,
    nombre: 'WINSTON WALTER PEÑA FLOREZ',
    cedula: '21.086.774',
    asistencia: 0,
  },
  {
    numero_empleado: 189596,
    nombre: 'LUIS FERNANDO SANCHEZ ALVAREZ',
    cedula: '24.778.434',
    asistencia: 0,
  },
  {
    numero_empleado: 196979,
    nombre: 'MARIA ELIZABETH MIRANDA CUBIDES',
    cedula: '24.820.902',
    asistencia: 0,
  },
  {
    numero_empleado: 193590,
    nombre: 'MIGUEL ARGENIS MARIÑO CARDENAS',
    cedula: '27.270.027',
    asistencia: 0,
  },
  {
    numero_empleado: 183574,
    nombre: 'MARIA JOSE VILLAMIZAR GARCIA',
    cedula: '27.462.353',
    asistencia: 0,
  },
  {
    numero_empleado: 196966,
    nombre: 'DARWIN JOHAN SANGRONIS MALDONADO',
    cedula: '28.257.803',
    asistencia: 0,
  },
  {
    numero_empleado: 196978,
    nombre: 'DAILY ISAMAR PUENTES CUELLAR',
    cedula: '28.591.424',
    asistencia: 0,
  },
  {
    numero_empleado: 193585,
    nombre: 'MANUEL ALEJANDRO GARCIA MALDONADO',
    cedula: '30.433.497',
    asistencia: 0,
  },
  {
    numero_empleado: 185176,
    nombre: 'YURY YESMIN GAMBOA RUIZ',
    cedula: 'E84.574.726',
    asistencia: 0,
  },
];

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [empleados, setEmpleados] = useState(EMPLEADOS);
  const [empleadoDetails, setEmpleadoDetails] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setQrData(data);

    // Buscar el número de empleado en los datos
    const updatedEmpleados = empleados.map(emp => {
      if (emp.numero_empleado === parseInt(data)) {
        // Actualizar la asistencia sumando 1
        return {
          ...emp,
          asistencia: emp.asistencia + 1
        };
      }
      return emp;
    });

    // Buscar el empleado en los datos actualizados
    const employee = updatedEmpleados.find(emp => emp.numero_empleado === parseInt(data));

    if (employee) {
      // Mostrar nombre y cédula del empleado
      setEmpleadoDetails(employee);
      // Actualizar el estado con los datos actualizados
      setEmpleados(updatedEmpleados);
    } else {
      // Mostrar mensaje si el empleado no se encuentra
      setEmpleadoDetails(null);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setQrData(null);
    setEmpleadoDetails(null); // Limpiar los detalles del empleado al escanear de nuevo
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
              {empleadoDetails ? (
                <View>
                  <Text>Nombre: {empleadoDetails.nombre}</Text>
                  <Text>Cédula: {empleadoDetails.cedula}</Text>
                  <Text>Asistencia: {empleadoDetails.asistencia}</Text>
                </View>
              ) : (
                <Text>Empleado no encontrado.</Text>
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