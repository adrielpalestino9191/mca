import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { Card, Button, Text, CheckBox } from 'react-native-elements';
import axios from 'axios';
import { Audio } from 'expo-av';

const TestScreen = ({ navigation, route }) => {
  const { preguntas, alumno } = route.params;

  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
  const [habilitado, setHabilitado] = useState(false);

  const preguntaActual = preguntas[preguntaIndex];

  const reproducirAudio = async () => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(require('./../assets/next.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log('Error al reproducir el audio:', error);
    }
  };

  const handleRespuestaSeleccionada = (idRespuesta) => {
    reproducirAudio();
    if (respuestasSeleccionadas.includes(idRespuesta)) {
      setRespuestasSeleccionadas((prevRespuestas) =>
        prevRespuestas.filter((resp) => resp !== idRespuesta)
      );
    } else {
      setRespuestasSeleccionadas((prevRespuestas) => [...prevRespuestas, idRespuesta]);
    }
    setHabilitado(true);
    handleSiguientePregunta();
  };

  const checkHabilitado = () => {
    setHabilitado(respuestasSeleccionadas.length > 0);
  };

  const handleSiguientePregunta = () => {
    if (preguntaIndex < preguntas.length - 1) {
      setHabilitado(false);
      setPreguntaIndex((prevIndex) => prevIndex + 1);
    } else {
      setHabilitado(false);
    }
  };

  const handleGuardar = () => {
    const data = {
      id: alumno.id,
      respuestas: respuestasSeleccionadas,
    };

    axios
      .post('https://proyectolibrosminerva.com/Controller/TestController.php?opt=3', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        alert('Examen guardado, revisa tu puntuación y observaciones en el menú principal');
        navigation.navigate('Menu', alumno);
        console.log('Respuesta del servidor:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/test.jpeg')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Pregunta</Card.Title>
          <Text style={styles.textoJustificado}>{preguntaActual.preg}</Text>
          {preguntaActual.img ? (
            <Image source={{ uri: preguntaActual.img }} style={styles.image} />
          ) : (
            <></>
          )}
        </Card>

        {preguntaActual.respuestas.map((respuesta) => (
          <CheckBox
            style={styles.checkbox}
            key={respuesta.id_respuesta}
            title={
              respuesta.imgr ? (
                <>
                  <Image source={{ uri: respuesta.imgr }} style={styles.imager} />
                  <Text>{respuesta.resp}</Text>
                </>
              ) : (
                respuesta.resp
              )
            }
            checked={respuestasSeleccionadas.includes(respuesta.id_respuesta)}
            onPress={() => handleRespuestaSeleccionada(respuesta.id_respuesta)}
          />
        ))}

        {preguntaIndex === preguntas.length - 1 && (
          <Button title="Guardar" onPress={handleGuardar} />
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 80,
  },
  checkbox: {
    backgroundColor: '#D93744',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#D93744',
    textShadowOffset: { width: 2, height: 2 },
    borderRadius: 20,
  },
  card: {
    marginBottom: 20,
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textoJustificado: {
    textAlign: 'justify',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#D93744',
    textShadowOffset: { width: 2, height: 2 },
    padding: 10,
  },
  fondo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 70,
  },
  imager: {
    width: 40,
    height: 40,
  },
});

export default TestScreen;
