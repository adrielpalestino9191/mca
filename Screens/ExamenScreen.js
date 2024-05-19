import React,{ useState ,useEffect} from 'react';
import { TouchableOpacity, View,Text ,Image,ImageBackground,StyleSheet} from 'react-native';
import axios from 'axios';



const ExamenScreen = ({navigation,route}) => {

const alumno = route.params;
const [preguntas, setPreguntas] = useState([]);

const [imageUrl, setImageUrl] = useState('');
const [nivel,setNivel]=useState("")
useEffect(() => {
  const fetchPreguntas = async () => {
    try {
      const response = await axios.get('https://proyectolibrosminerva.com/Controller/TestController.php?opt=1&id='+alumno.id);
     
      console.log('https://proyectolibrosminerva.com/Controller/TestController.php?opt=1&id='+alumno.id)
      const simplifiedJSON = response.data.reduce((acc, curr) => {
        const { id, preg, img } = curr;
        const { id_respuesta, resp, correcto,imgr } = curr;
        const foundItem = acc.find(item => item.id === id);
        if (foundItem) {
            foundItem.respuestas.push({ id_respuesta, resp, correcto,imgr });
        } else {
            acc.push({
                id,
                preg,
                respuestas: [{ id_respuesta, resp, correcto,imgr }],
                img
            });
        }
    
        return acc;
    }, []);
    setTimeout(function(){
      console.log("Hola Mundo");
  }, 2000);
      
      
      setPreguntas(JSON.parse(JSON.stringify(simplifiedJSON, null, 2)));
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };

    fetchPreguntas();
  }, []);



  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://proyectolibrosminerva.com/Controller/TestController.php?opt=2&id='+alumno.id);
        console.log('https://proyectolibrosminerva.com/Controller/TestController.php?opt=2&id='+alumno.id)
        const imageData = response.data;

        // Obtener la URL de la imagen de la respuesta
        const imageUrl = imageData[0].url; // Ajusta esto según la estructura de tu respuesta
        setNivel(imageData[0].nivel)

        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
      }
    };

    fetchImage();
  }, []);

  const handleTest = () => {
    navigation.navigate("Test",{preguntas:preguntas,alumno:alumno})
  }
  return (
    <ImageBackground
    source={require('../assets/entrar.jpeg')}
    style={styles.fondo}
    resizeMode="cover"
  >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUrl ? (
        <TouchableOpacity onPress={handleTest}> 
          <Text style={styles.nivel}>Nivel {nivel}</Text>
          <Text style={styles.nivel}>Comenzar</Text> 
        </TouchableOpacity>
      ) : (
        <Text>Cargando imagen...</Text>
      )}
    </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: '#D93744',
    fontWeight: 'bold',
    textShadowColor: '#D93744',
    textShadowOffset: { width: 2, height: 2 },
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    fontSize:25,
    color: 'white',
    marginBottom:10
  },
  nivel:{
    backgroundColor: '#D93744',
    fontWeight: 'bold',
    textShadowColor: '#D93744',
    textShadowOffset: { width: 2, height: 2 },
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    fontSize:25,
    color: 'white',
    marginBottom:10
  },
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

export default ExamenScreen;
