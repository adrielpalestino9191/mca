import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing ,ImageBackground} from 'react-native';

const NivelesScreen = ({ route }) => {
  const alumno = route.params;
  const [nivel, setNivel] = useState(1);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    fetch('https://proyectolibrosminerva.com/Controller/TestController.php?opt=2&id='+alumno.id)
      .then(response => response.json())
      .then(data => {
        const nivelObtenido = data[0].nivel;
        console.log(nivelObtenido)
        if (nivelObtenido >= 1 && nivelObtenido <= 3) {
          setNivel(nivelObtenido);
        }
      })
      .catch(error => console.error('Error al obtener el nivel:', error));
  }, []);

  useEffect(() => {
    const startAnimation = () => {
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
    };

    startAnimation();
  }, [nivel]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <ImageBackground
      source={require('../assets/niveles.jpeg')}
      style={styles.fondo}
      resizeMode="cover" // Ajusta la imagen para que cubra todo el espacio disponible
    >
      <View style={styles.container}>

      <Text style={styles.title}>Instrucciones:</Text>
      <Text style={styles.instructions}>
      A continuación encontrarás el nivel en el que te encuentras,el circulo verde indica tu nivel.
      </Text>

        <View style={styles.nodeContainer}>
          <Text style={styles.nodeText}>Nivel 1</Text>
          <Animated.View style={[styles.node, (nivel === "1" ? styles.enabledNode : styles.disabledNode), { transform: [{ translateY }] }]} />
        </View>
        <View style={styles.line} />
        <View style={styles.nodeContainer}>
          <Text style={styles.nodeText}>Nivel 2</Text>
          <Animated.View style={[styles.node, (nivel === "2" ? styles.enabledNode : styles.disabledNode), { transform: [{ translateY }] }]} />
        </View>
        <View style={styles.line} />
        <View style={styles.nodeContainer}>
          <Text style={styles.nodeText}>Nivel 3</Text>
          <Animated.View style={[styles.node, (nivel === "3" ? styles.enabledNode : styles.disabledNode), { transform: [{ translateY }] }]} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  nodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  node: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'limegreen',
    margin: 10,
  },
  enabledNode: {
    backgroundColor: 'limegreen',
    elevation: 5,
  },
  disabledNode: {
    backgroundColor: '#ccc',
  },
  nodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    backgroundColor:'#D93744',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#D93744', // Color de la sombra
    textShadowOffset: { width: 2, height: 2 }, // Tamaño de la sombra
    borderRadius: 20, 
    padding:10
  },
  line: {
    width: 2,
    height: 80,
    backgroundColor: 'black',
  },
  fondo: {
    flex: 1, // Para que la imagen de fondo cubra todo el View y la pantalla
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, 
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
    textShadowColor: '#D93744', // Color de la sombra
    textShadowOffset: { width: 2, height: 2 }, // Tamaño de la sombra
    borderRadius: 20, // Ajusta este valor según lo redondeado que quieras que sea el borde
   // Puedes añadir un borde si lo deseas
     // Color del borde, ajusta según lo que necesites
    
  },
});

export default NivelesScreen;
