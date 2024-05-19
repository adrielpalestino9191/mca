import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const InformacionScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="exclamation-circle" size={24} color="black" style={styles.icono} />
          <Text style={styles.encabezado}>Información Importante</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.balloon}>
            <Text style={styles.texto}>
              La aplicación denomina app y sistema inteligente tiene el objetivo de ayudar al alumno a mejorar sus habilidades matemáticas en el nivel primaria, específicamente sexto grado. Los niveles y los test fueron planificados como parte de esta investigación. La elaboración de los test fue creada por una profesora con más de 15 años de experiencia en el ramo como apoyo a la investigación. El tratamiento de los datos es sin fines de lucro y no se compartirán con terceros. La información queda almacenada solo con fines de investigación educativa, respetando el artículo 16 de la Constitución Política de los Estados Unidos Mexicanos. Así mismo, si usted desea cancelar su inscripción a esta aplicación lo puede hacer en cualquier momento, sus datos serán destruidos de nuestras bases de datos.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:70,
    marginStart:20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icono: {
    marginRight: 5,
  },
  encabezado: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  balloon: {
    backgroundColor: '#D93744',
    padding: 15,
    borderRadius: 10,
    maxWidth: '90%',
  },
  texto: {
    backgroundColor: '#D93744',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#D93744',
    textShadowOffset: { width: 2, height: 2 },
    borderRadius: 20,
    padding: 10,
    fontSize: 15,
    textAlign: 'justify',
  },
});

export default InformacionScreen;
