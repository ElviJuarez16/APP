import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseconfig";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (email) {
        try {
          const q = query(
            collection(db, "usuarios"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserRole(userData.rol); // "admin" o "alumno"
          } else {
            console.log("Usuario no encontrado");
          }
        } catch (error) {
          console.error("Error al consultar Firestore:", error);
        }
      }
    };

    fetchUserRole();
  }, [email]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
      return;
    }

    try {
      const q = query(
        collection(db, "usuarios"),
        where("Corre Electrónico", "==", email),
        where("contraseña", "==", password) // Validación de contraseña
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        await AsyncStorage.setItem("userType", userData.rol);

        if (userData.rol === "admin") {
          navigation.navigate("Admin");
        } else {
          navigation.navigate("PerfilAlumno");
        }
      } else {
        Alert.alert("Error", "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Recuperar Contraseña")}
      >
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#8b4513",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#f5f5dc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#007BFF",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 15,
  },
});

export default Login;
