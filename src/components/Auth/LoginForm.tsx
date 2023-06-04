import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";

type initialValues = {
  username: string;
  password: string;
};

const initialValues: initialValues = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues,
    onSubmit: ({ username, password }) => {
      setError("");
      if (user.username !== username && user.password !== password) {
        setError("Invalid username or password");
      } else {
        login(userDetails);
      }
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
  });

  return (
    <View>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        placeholder="username"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <Text style={styles.error}>{formik.errors.username}</Text>
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Button title="Log in" onPress={formik.handleSubmit} />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    margin: 10,
  },
});
