import { StatusBar } from "expo-status-bar";
import React from "react";
import Main from "./screens/Main";
import { Container } from "./styles/appStyles";

export default function App() {
  if (__DEV__) {
    console.log("We're in Dev");
  }
  return (
    <Container>
      <Main />
      <StatusBar style="light" />
    </Container>
  );
}
