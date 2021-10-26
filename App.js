import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

import SpinningCoube from "./components/SpinningCoube";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SpinningCoube />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contenContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});
