import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { View } from "native-base";

import React from "react";

export default function ModalScreen() {
  return (
    <View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
