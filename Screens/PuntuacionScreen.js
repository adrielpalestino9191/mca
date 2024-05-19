import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image, ImageBackground } from 'react-native';
import axios from 'axios';

const PuntuacionScreen = ({ navigation,route }) => {
  const  alumno  = route.params;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [puntuacion, setPuntuacion] = useState(0);
  const [color, setColor] = useState('red'); // Por defecto, el círculo será rojo

  useEffect(() => {
    console.log("alumno",alumno)
    // Obtener la puntuación del usuario
    axios.get(`https://proyectolibrosminerva.com/Controller/UsuarioController.php?opt=7&id=${alumno.id}`)
      .then(response => {
        const score = response.data;
        setPuntuacion(score);
        setColor(getCircleColor(score)); // Determinar el color del círculo según la puntuación
      })
      .catch(error => {
        console.error(error);
      });

    // Animación del círculo
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [alumno.id, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  // Función para determinar el color del círculo según la puntuación
  const getCircleColor = (score) => {
    if (score >= 81 && score <= 100) {
      return 'green';
    } else if (score >= 60 && score <= 80) {
      return 'orange';
    } if (score == 0) {
      return 'gray';
    } else {
      return 'red';
    }
  };

  // Mensaje según el color del círculo
  const mensaje = () => {
    if (color === 'green') {
      return '¡Felicitaciones!';
    } else if (color === 'orange') {
      return '¡Sigue practicando!';
    } else if (color === 'gray') {
      return '¡En espera de tus resultados!';
    }else {
      return '¡Oh no, por favor sigue estudiando y haciendo las sugerencias que la app te indica!';
    }
  };

  return (
    <ImageBackground
      source={require('../assets/entrar.jpeg')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Animated.View style={[styles.circle, { transform: [{ translateY }], backgroundColor: color }]}>
          <Text style={styles.puntuacion}>{puntuacion}/100</Text>
        </Animated.View>
       
        <Text style={styles.texto}>{mensaje()}</Text>
        {color === "gray" ? (
          <Text>...</Text>
        ) : (
          <Animated.Image source={require('./../assets/confetti.png')} style={[styles.confeti, { opacity: animatedValue }]} />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  puntuacion: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  texto: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    padding:20,
    backgroundColor:'#D93744',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#D93744',
    textShadowOffset: { width: 2, height: 2 },
    borderRadius: 20,
  },
  confeti: {
    position: 'absolute',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  fondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PuntuacionScreen;
