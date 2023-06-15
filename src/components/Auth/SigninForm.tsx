import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

import { useFormik } from "formik";
import * as Yup from "yup";

import { firebaseConfig } from "../../../firebase-config";
type initialValues = {
  emailInput: string;
  usernameInput: string;
  passwordInput: string;
  confirmPasswordInput: string;
};

const initialValues: initialValues = {
  emailInput: "",
  usernameInput: "",
  passwordInput: "",
  confirmPasswordInput: "",
};

export default function SignupForm({ login }: { login: () => void }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const handleCreateUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the user's profile with the displayName
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            const database = getDatabase(app);
            const userRef = ref(database, `users/${user.uid}`);
            const userData = {
              favoritePokemonCount: [],
            };
            set(userRef, userData);
          })
          .catch((error) => {
            console.error(error);
            Alert.alert(error.message);
          });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(error.message);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      handleCreateUser;
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      emailInput: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      usernameInput: Yup.string().required("Username is required"),
      passwordInput: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPasswordInput: Yup.string()
        .oneOf([Yup.ref("passwordInput")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          formik.setFieldValue("emailInput", text);
        }}
      />
      <Text style={styles.error}>{formik.errors.emailInput}</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        autoCapitalize="none"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          formik.setFieldValue("usernameInput", text);
        }}
      />
      <Text style={styles.error}>{formik.errors.usernameInput}</Text>
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          formik.setFieldValue("passwordInput", text);
        }}
      />
      <Text style={styles.error}>{formik.errors.passwordInput}</Text>
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          formik.setFieldValue("confirmPasswordInput", text);
        }}
      />
      <Text style={styles.error}>{formik.errors.confirmPasswordInput}</Text>
      <Pressable onPress={handleCreateUser} style={styles.button}>
        <Text>Sign Up</Text>
      </Pressable>
      <Pressable onPress={login} style={styles.button}>
        <Text>Login</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#A9CBD9",
    width: 300,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    margin: 10,
  },
});
