import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, ImageBackground ,Text} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const ScratchGame = ({navigation,route}) => {
  const {id} = route.params
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("id",id)
    axios.get('https://proyectolibrosminerva.com/Controller/GameController.php?opt=1&id='+id)
      .then(response => {
        // Asumimos que la URL está en response.data.url
        console.log(response.data.url)
        setUrl(response.data.url);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <ImageBackground 
    source={require('../assets/fondo.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error al cargar el contenido</Text>
        ) : (
          <WebView
            source={{ uri: url }}
            style={{ flex: 1 }}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ScratchGame;