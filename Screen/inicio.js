import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/portadadefinitiva.png')} style={styles.imagen} />
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.botonTexto}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: '#777',
  },
  boton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
