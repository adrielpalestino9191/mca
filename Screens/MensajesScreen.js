import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList ,ActivityIndicator,ImageBackground} from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
const MensajesScreen = ({navigation,route}) => {
  const alumno = route.params;
  const [mensajes, setMensajes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchMensajes();
  }, [pageNumber]);

  const fetchMensajes = async () => {
    // Realizar solicitud GET para obtener los mensajes
     

      try {
        const response = await axios.get(`https://proyectolibrosminerva.com/Controller/AppController.php?opt=1&page=${pageNumber}&pageSize=10&id=`+alumno.id);
        console.log(`https://proyectolibrosminerva.com/Controller/AppController.php?opt=1&page=${pageNumber}&pageSize=10&id=`+alumno.id)
        const data = response.data; // Aquí obtenemos el cuerpo de la respuesta
        setMensajes(JSON.parse(JSON.stringify(response.data))); // Intentamos analizar el cuerpo como JSON
        console.log('Mensajes:', response.data);

      } catch (error) {
        console.error('Error fetching mensajes:', error);
      }

     

  };

  const abrirMensaje = (mensajeId, contenidoMensaje) => {
    navigation.navigate('Msg', { messageId: mensajeId, messageContent: contenidoMensaje });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => abrirMensaje(item.id, item.contenido)} style={styles.mensaje}>
      <Text style={styles.remitente}>{item.remitente}</Text>
      <Text style={styles.asunto}>{item.asunto}</Text>
      <Text numberOfLines={2} style={styles.contenido}>{item.contenido}</Text>
      <Text style={styles.fecha}>{item.fecha}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (

    <ImageBackground
    source={require('../assets/mensajes.jpeg')}
    style={styles.fondo}
    resizeMode="cover" // Ajusta la imagen para que cubra todo el espacio disponible
  >
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bandeja de entrada</Text>
        <TouchableOpacity>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={mensajes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => setPageNumber(pageNumber + 1)}
        ListFooterComponent={renderFooter}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:80
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor:'#D93744',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#D93744', // Color de la sombra
    textShadowOffset: { width: 2, height: 2 }, // Tamaño de la sombra
    borderRadius: 20, 
    padding:10
  },
  mensaje: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  remitente: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  asunto: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  fecha:{
    textAlign: 'right',
    color: '#333',
    marginBottom: 3,
  },
  contenido: {
    color: '#666',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  fondo: {
    flex: 1,
    resizeMode: 'cover', // Para que la imagen cubra todo el contenedor
    justifyContent: 'center',
  }
});

export default MensajesScreen;
