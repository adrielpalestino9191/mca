import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el icono que desees utilizar

const screenWidth = Dimensions.get('window').width;

const MenuScreen = ({ navigation, route }) => {
  const menuOptions = [
    { title: 'Mi Perfil      ', screen: 'Actualiza', icon: 'user' },
    { title: 'Niveles       ', screen: 'Niveles', icon: 'bar-chart' },
    { title: 'Mensajes    ', screen: 'Mensajes', icon: 'envelope' },
    { title: 'Información', screen: 'Informacion', icon: 'info-circle' },
    { title: 'Test             ', screen: 'Examen', icon: 'pencil' },
    { title: 'Mini Juegos', screen: 'Juegos', icon: 'gamepad' },
    { title: 'Puntuación  ', screen: 'Puntuacion', icon: 'star' },
    { title: 'Cerrar Sesión', screen: 'Login', icon: 'sign-out' }
  ];
  const alumno = route.params;

  const renderMenuOptions = () => {
    return menuOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.option}
        onPress={() => navigation.navigate(option.screen, alumno)}
      >
        <Icon name={option.icon} size={20} color="white" style={styles.icon} />
        <Text style={styles.optionText}>{option.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ImageBackground
      source={require('../assets/menu.jpeg')}
      style={styles.fondo}
    >
      <View style={styles.container}>
        <View style={styles.column}>
          {renderMenuOptions().slice(0, 2)}
        </View>
        <View style={styles.column}>
          {renderMenuOptions().slice(2, 4)}
        </View>
        <View style={styles.column}>
          {renderMenuOptions().slice(4, 6)}
        </View>
        <View style={styles.column}>
          {renderMenuOptions().slice(6, 8)}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop:110
  },
  column: {
    width: '50%', // Dos columnas
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    backgroundColor: 'rgba(217, 55, 68, 0.5)', // Fondo semitransparente blanco
    paddingVertical: 15,
   
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
  },
  icon: {
    marginRight: 10,
  },
  fondo: {
    flex: 1, // Para que la imagen de fondo cubra todo el view
    resizeMode: 'cover', // Para que la imagen se ajuste correctamente al tamaño del view
  },
});

export default MenuScreen;
