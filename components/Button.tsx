import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";
type Props = {
  type: "primary" | "secondary";
  children: React.ReactNode;
} & TouchableOpacityProps;

export default function Button(props: Props) {
  const style = styles(props.type);

  return (
    <TouchableOpacity style={style.button} {...props}>
      <Text style={style.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const colors = {
  background: {
    primary: "#047C3F",
    secondary: "#F7DD43",
  },
  text: {
    primary: "#FFF",
    secondary: "#000",
  },
};

const styles = (type: "primary" | "secondary" = "primary") =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.background[type],
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: colors.text[type],
      fontSize: 16,
      textTransform: "uppercase",
    },
  });
