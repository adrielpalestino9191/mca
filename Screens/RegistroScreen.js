import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';



const RegistroScreen = ({ navigation }) => {
  const fechaHaceDoceAnios = new Date();
  fechaHaceDoceAnios.setFullYear(fechaHaceDoceAnios.getFullYear() - 12);
  const [fechaNacimiento, setFechaNacimiento] = useState(fechaHaceDoceAnios);
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [nombrePadre, setNombrePadre] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [gradoEstudios, setGradoEstudios] = useState('6');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar la visibilidad del DatePicker
  
  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      setFechaNacimiento(selectedDate);
    }
  };


  

  const handleRegistro = async () => {
    console.log("Entrando")

     // Validar que ningún campo esté vacío
  if (
    nombre === '' ||
    apellidoPaterno === '' ||
    apellidoMaterno === '' ||
    fechaNacimiento === '' ||
    nombrePadre === '' ||
    correoElectronico === '' ||
    telefono === '' ||
    password === '' ||
    whatsapp === ''
  ) {
    alert('Por favor, complete todos los campos.');
    return; // Detener la ejecución de la función si hay campos vacíos
  }


   // Validar que las contraseñas coincidan
   if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    return; // Detener la ejecución de la función si las contraseñas no coinciden
  }


  // Validar el formato del correo electrónico
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(correoElectronico)) {
    alert('Por favor, ingrese un correo electrónico válido.');
    return; // Detener la ejecución de la función si el correo electrónico no es válido
  }

    try {
        const response = await axios.post('https://proyectolibrosminerva.com/Controller/UsuarioController.php', {
          nombre: nombre,
          apellidoPaterno:apellidoPaterno,
          apellidoMaterno:apellidoMaterno,
          fechaNacimiento:fechaNacimiento,
          nombrePadre:nombrePadre,
          correo:correoElectronico,
          telefono:whatsapp,
          gradoEstudios:gradoEstudios,
          pwd:password,
          opt:"2"
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log('Respuesta del servidor:', response.data);
        if(response.data == "true" || response.data){
            alert("Registrado correctamente, ya puedes iniciar sesión")
            navigation.navigate("Login");
        }
        // Manejar la respuesta aquí
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }

  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={styles.fondo}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Instrucciones:</Text>
          <Text style={styles.instructions}>
            Captura correctamente todos los campos que se presentan a continuación.
            Este registro lo deberá realizar el tutor o los padres del niño que cursa la primaria.
          </Text>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Apellido Paterno:</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChangeText={setApellidoPaterno}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Apellido Materno:</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChangeText={setApellidoMaterno}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <TouchableOpacity onPress={handleDatePress}>
              <TextInput
                style={styles.input}
                placeholder="Fecha de Nacimiento"
                editable={false}
                value={fechaNacimiento ? fechaNacimiento.toDateString() : ''}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={fechaNacimiento || new Date()}
                mode="date"
                maximumDate={new Date()}
                onChange={handleDateChange} 
                themeVariant="dark" // Cambiar el color del calendario
              />
            )}
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Nombre del Padre o Tutor:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Padre o Tutor"
              value={nombrePadre}
              onChangeText={setNombrePadre}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Correo Electrónico:</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={correoElectronico}
              onChangeText={setCorreoElectronico}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Repetir Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Repetir Contraseña"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {/* Fin del nuevo campo */}

          <View style={styles.inputRow}>
            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
            />
          </View>
         
          <View style={styles.inputRow}>
            <Text style={styles.label}>Número de WhatsApp:</Text>
            <TextInput
              style={styles.input}
              placeholder="Número de WhatsApp"
              value={whatsapp}
              onChangeText={setWhatsapp}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.boldLabel}>Grado de escolar:</Text>
            <Picker
              style={styles.input}
              selectedValue={gradoEstudios}
              onValueChange={(itemValue) => setGradoEstudios(itemValue)}>
              <Picker.Item label="1ero" value="1" />
              <Picker.Item label="2do" value="2" />
              <Picker.Item label="3ero" value="3" />
              <Picker.Item label="4to" value="4" />
              <Picker.Item label="5to" value="5" />
              <Picker.Item label="6to" value="6" />
            </Picker>
          </View>
          <TouchableOpacity  style={[styles.button, { backgroundColor: '#D93744' }]} onPress={handleRegistro}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'white'
  },
  instructions: {
    textAlign: 'justify',
    marginBottom: 14, 
    padding:20,
    fontSize:16,
    backgroundColor:'#D93744',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#D93744',
    textShadowOffset: { width: 2, height: 2 },
    borderRadius: 20,
  },
  inputRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    elevation: 5,
    backgroundColor: '#D93744',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#D93744',
    textShadowOffset: { width: 2, height: 2 },
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  },
  boldLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    backgroundColor: '#D93744',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RegistroScreen;
