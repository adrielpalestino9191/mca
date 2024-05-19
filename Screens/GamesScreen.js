import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
const GameList = ({navigation,route}) => {
  const { alumno } = route.params;
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(false);

 
  useEffect(() => {
    console.log(alumno)
    //const al= JSON.parse(alumno)
    //console.log("alumno",al.id)
    axios.get('https://proyectolibrosminerva.com/Controller/GameController.php?opt=2&id=1')
      .then(response => {
        setGames(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  console.log(games)
  console.log(loading)
  console.log(error)
  const handlePress = (id) => {
    navigation.navigate('Game', {id: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.card}>
      <Image source={{ uri: item.imgg }} style={styles.image} />
      <Text style={styles.title}>{item.subtema}</Text>
      <Text style={styles.description}>{item.instrucciones}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
    source={require('../assets/fondo.jpeg')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error al cargar el contenido</Text>
        ) : (
         <>
         <Text style={styles.card}>Aquí tienes la lista de juegos que te sugerimos de acuerdo a tus habilidades a mejorar</Text>
        
          <FlatList
            data={games}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
           </> 
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop:10
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor:'#D93744',
    opacity:0.7,
    color:'white',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'white',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color:'white',
  },
});

export default GameList;