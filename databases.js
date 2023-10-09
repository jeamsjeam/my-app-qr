import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'employees.db', location: 'default' });

const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, numero_personal TEXT, nombre TEXT, cedula TEXT, asistencia INTEGER DEFAULT 0)',
      [],
      () => {
        // La tabla se creó correctamente, ahora insertamos los datos de los empleados
        insertEmployee(tx, '196964', 'NELSON ALEXANDER CORREA ADAME', '9.460.433');
        insertEmployee(tx, '125599', 'MARY ELIZABETH CRISTANCHO', '9.461.301');
        insertEmployee(tx, '125730', 'FABIOLA JOSEFA GARCIA GAMBOA', '11.109.034');
        insertEmployee(tx, '125734', 'RONALD HOSLEY NIÑO GONZALEZ', '11.110.979');
        insertEmployee(tx, '125740', 'NELLY LOURDES RAMIREZ RAMIREZ', '11.114.297');
        insertEmployee(tx, '125849', 'ROBER ALFONSO RAMIREZ', '12.633.060');
        insertEmployee(tx, '125882', 'ENWER JOSE SAYAGO GONZALEZ', '13.038.718');
        insertEmployee(tx, '196968', 'EGLEE JOSEFINA TORRES AVILA', '14.051.032');
        insertEmployee(tx, '183576', 'LISBETH QUINTERO DE NIÑO', '14.217.918');
        insertEmployee(tx, '125996', 'CRISTIAM LEANDRO OSPINA TRIANA', '14.776.629');
        insertEmployee(tx, '127653', 'YURI VANESSA CALDERON BELTRAN', '14.776.952');
        insertEmployee(tx, '126094', 'ANGEL FRANCISCO SAYAGO CRISTANCHO', '17.863.570');
        insertEmployee(tx, '196965', 'ENDER GOMEZ SUAREZ', '19.540.873');
        insertEmployee(tx, '185847', 'MARCOS DANIEL SUAREZ VERGARA', '20.617.778');
        insertEmployee(tx, '196972', 'WINSTON WALTER PEÑA FLOREZ', '21.086.774');
        insertEmployee(tx, '189596', 'LUIS FERNANDO SANCHEZ ALVAREZ', '24.778.434');
        insertEmployee(tx, '196979', 'MARIA ELIZABETH MIRANDA CUBIDES', '24.820.902');
        insertEmployee(tx, '193590', 'MIGUEL ARGENIS MARIÑO CARDENAS', '27.270.027');
        insertEmployee(tx, '183574', 'MARIA JOSE VILLAMIZAR GARCIA', '27.462.353');
        insertEmployee(tx, '196966', 'DARWIN JOHAN SANGRONIS MALDONADO', '28.257.803');
        insertEmployee(tx, '196978', 'DAILY ISAMAR PUENTES CUELLAR', '28.591.424');
        insertEmployee(tx, '193585', 'MANUEL ALEJANDRO GARCIA MALDONADO', '30.433.497');
        insertEmployee(tx, '185176', 'YURY YESMIN GAMBOA RUIZ', 'E84.574.726');
      },
      (_, error) => {
        console.error(error);
      }          
    );
  });
};

const insertEmployee = (tx, numeroPersonal, nombre, cedula) => {
  tx.executeSql(
    'INSERT INTO employees (numero_personal, nombre, cedula) VALUES (?, ?, ?)',
    [numeroPersonal, nombre, cedula],
    (_, error) => {
      console.error(error);
    }    
  );
};

export { db, setupDatabase, insertEmployee };
