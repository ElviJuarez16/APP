import React, { useState } from 'react'; 
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native';

export default function AdminScreen() {
  const [alumnos, setAlumnos] = useState([]);
  const [nuevoAlumno, setNuevoAlumno] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [contadorPresentes, setContadorPresentes] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [editando, setEditando] = useState(null);
  const [esAdmin, setEsAdmin] = useState(true); // Flag para verificar si es administrador

  // Agregar o editar alumno
  const agregarAlumno = () => {
    if (nuevoAlumno.trim() === '' || nuevaCategoria.trim() === '') {
      Alert.alert('Error', 'El nombre del alumno y la categoría no pueden estar vacíos');
      return;
    }

    if (editando !== null) {
      setAlumnos(prevAlumnos => prevAlumnos.map((alumno, index) =>
        index === editando ? { ...alumno, texto: nuevoAlumno, categoria: nuevaCategoria } : alumno
      ));
      setEditando(null);
    } else {
      if (alumnos.some(a => a.texto.toLowerCase() === nuevoAlumno.toLowerCase())) {
        Alert.alert('Error', 'Este alumno ya está en la lista');
        return;
      }
      setAlumnos(prevAlumnos => [
        ...prevAlumnos,
        { texto: nuevoAlumno, categoria: nuevaCategoria, completada: false },
      ]);
    }

    setNuevoAlumno('');
    setNuevaCategoria('');
  };

  const eliminarAlumno = (texto) => {
    Alert.alert(
      'Confirmar Eliminación',
      `Estás seguro de que deseas eliminar a ${texto}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            const alumnoAEliminar = alumnos.find(alumno => alumno.texto === texto);
            setAlumnos(prevAlumnos => prevAlumnos.filter(alumno => alumno.texto !== texto));
            if (alumnoAEliminar && alumnoAEliminar.completada) {
              setContadorPresentes(prevContador => prevContador - 1);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const marcarAlumno = (texto) => {
    setAlumnos(prevAlumnos => {
      const alumno = prevAlumnos.find(a => a.texto === texto);
      const updatedAlumnos = prevAlumnos.map(alumno =>
        alumno.texto === texto
          ? { ...alumno, completada: !alumno.completada }
          : alumno
      );
      setContadorPresentes(prevContador =>
        prevContador + (alumno && alumno.completada ? -1 : 1)
      );
      return updatedAlumnos;
    });
  };

  const iniciarEdicion = (index) => {
    setNuevoAlumno(alumnosFiltrados[index].texto);
    setNuevaCategoria(alumnosFiltrados[index].categoria);
    setEditando(alumnos.indexOf(alumnosFiltrados[index]));
  };

  const alumnosFiltrados = alumnos.filter(alumno =>
    alumno.texto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.titulo}>Lista de Alumnos</Text>

      {esAdmin && (
        <View style={styles.contadorContainer}>
          <Text style={styles.contadorTexto}>N° Alumnos: <Text style={styles.contadorNumero}>{alumnos.length}</Text></Text>
          <Text style={styles.contadorTexto}>Presentes: <Text style={styles.contadorNumero}>{contadorPresentes}</Text></Text>
        </View>
      )}

      <View style={styles.busquedaContainer}>
        <TouchableOpacity>
          <Text style={styles.iconoLupa}>🔍</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputBusqueda}
          placeholder="Buscar alumno..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {esAdmin && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Agregar alumno"
            value={nuevoAlumno}
            onChangeText={setNuevoAlumno}
          />
          <TextInput
            style={styles.input}
            placeholder="Agregar categoría"
            value={nuevaCategoria}
            onChangeText={setNuevaCategoria}
          />
          <TouchableOpacity style={styles.botonAgregar} onPress={agregarAlumno}>
            <Text style={styles.botonTexto}>{editando !== null ? 'Guardar' : 'Agregar'}</Text>
          </TouchableOpacity>
        </>
      )}

      <FlatList
        data={alumnosFiltrados}
        renderItem={({ item, index }) => (
          <View style={styles.alumnoContainer}>
            <TouchableOpacity onPress={() => marcarAlumno(item.texto)}>
              <View style={[styles.circuloEstado, item.completada && styles.completada]} />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <Text style={[styles.alumnoTexto, item.completada && styles.textoCompletado]}>
                {item.texto}
              </Text>
              <Text style={styles.categoriaTexto}>{item.categoria}</Text>
            </View>
            {esAdmin && (
              <View style={styles.botones}>
                <TouchableOpacity style={styles.botonEditar} onPress={() => iniciarEdicion(index)}>
                  <Text style={styles.botonTexto}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarAlumno(item.texto)}>
                  <Text style={styles.botonTexto}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listaAlumnos}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8b4513',
    alignItems: 'center',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 30,
    color: '#f5f5dc',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  contadorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  contadorTexto: {
    fontSize: 18,
    color: '#f5f5dc',
  },
  contadorNumero: {
    color: '#ffc107',
    fontWeight: 'bold',
  },
  busquedaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  inputBusqueda: {
    flex: 1,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    marginLeft: 10,
  },
  iconoLupa: {
    fontSize: 20,
    color: '#8b4513',
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  botonAgregar: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listaAlumnos: {
    width: '100%',
  },
  alumnoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  circuloEstado: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8b4513',
    marginRight: 10,
  },
  completada: {
    backgroundColor: '#28a745',
  },
  alumnoTexto: {
    fontSize: 18,
    color: '#000',
  },
  categoriaTexto: {
    fontSize: 14,
    color: '#8b4513',
  },
  textoCompletado: {
    textDecorationLine: 'line-through',
    color: '#8b4513',
  },
  botones: {
    flexDirection: 'row',
  },
  botonEditar: {
    marginLeft: 10,
  },
  botonEliminar: {
    marginLeft: 10,
  },
});
