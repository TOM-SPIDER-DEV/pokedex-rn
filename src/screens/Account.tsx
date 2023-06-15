import React, { useCallback, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase-config";
import UserData from "../components/Auth/UserData";
import LoginForm from "../components/Auth/LoginForm";
import { useFocusEffect } from "@react-navigation/native";

export default function Account() {
  const [isUser, setIsUser] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const auth = getAuth(app);

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsUser(user ? true : false);
      });

      return () => unsubscribe();
    }, [])
  );

  return isUser ? <UserData /> : <LoginForm />;
}
