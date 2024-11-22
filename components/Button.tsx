import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type ButtonType = "primary" | "secondary" | "danger";
interface Props extends TouchableOpacityProps {
  type: ButtonType;
  children: React.ReactNode;
}

export default function Button(props: Props) {
  const style = styles(props.type);

  return props.disabled ? (
    <TouchableOpacity
      style={{ ...style.button, backgroundColor: "#8D8D99", opacity: 0.5 }}
      {...props}
    >
      <Text style={style.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={style.button} {...props}>
      <Text style={style.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const colors = {
  background: {
    primary: "#047C3F",
    secondary: "#F7DD43",
    danger: "#FF4D4F",
  },
  text: {
    primary: "#FFF",
    secondary: "#000",
    danger: "#FFF",
  },
};

const styles = (type: ButtonType = "primary") =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.background[type],
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: "center",
      width: "100%",
    },
    buttonText: {
      color: colors.text[type],
      fontSize: 16,
      textTransform: "uppercase",
    },
  });
