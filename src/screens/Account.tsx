import { View, Text } from "react-native";
import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import UserData from "../components/Auth/UserData";
import useAuth from "../hooks/useAuth";

export default function Account() {
  const { user } = useAuth();
  return <View>{user ? <UserData /> : <LoginForm />}</View>;
}
