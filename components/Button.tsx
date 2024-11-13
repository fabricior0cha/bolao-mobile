import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";
type Props = {
  children: React.ReactNode;
} & TouchableOpacityProps;

export default function Button(props: Props) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#047C3F",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
