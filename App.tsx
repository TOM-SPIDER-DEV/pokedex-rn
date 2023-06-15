import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";
import { Text } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
