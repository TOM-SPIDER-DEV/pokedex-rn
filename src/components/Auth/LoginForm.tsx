import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from "react-native";

import React, { useState } from "react";

import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";

import { useFormik } from "formik";
import * as Yup from "yup";
import SignupForm from "./SigninForm";

type initialValues = {
  emailInput: string;
  passwordInput: string;
};

const initialValues: initialValues = {
  emailInput: "",
  passwordInput: "",
};

interface State {
  user: User | null;
  email: string;
  password: string;
  hasAlreadySignedIn: boolean;
}

export default function LoginForm() {
  const [state, setState] = useState<State>({
    user: null,
    email: "",
    password: "",
    hasAlreadySignedIn: false,
  });

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setState({ ...state, user });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(error.message);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      handleSignIn();
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
  });

  return !state.hasAlreadySignedIn ? (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={styles.title}>Log in</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        autoCapitalize="none"
        value={state.email}
        onChangeText={(email) => {
          setState({ ...state, email });
          formik.setFieldValue("email", email);
        }}
      />
      <Text style={styles.error}>{formik.errors.emailInput}</Text>
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={state.password}
        onChangeText={(password) => {
          setState({ ...state, password });
          formik.setFieldValue("password", password);
        }}
      />
      <Text style={styles.error}>{formik.errors.passwordInput}</Text>
      <Pressable onPress={handleSignIn} style={styles.button}>
        <Text>Log in</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => setState({ ...state, hasAlreadySignedIn: true })}
      >
        <Text>Sign up</Text>
      </Pressable>
    </ScrollView>
  ) : (
    <SignupForm
      login={() => {
        setState({ ...state, hasAlreadySignedIn: false });
      }}
    />
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
    marginTop: 4,
    width: 300,
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    width: 300,
    backgroundColor: "#A9CBD9",
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
