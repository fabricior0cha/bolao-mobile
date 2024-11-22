import React from "react";
import { StyleSheet, TextInput } from "react-native";

type Props = {} & React.ComponentProps<typeof TextInput>;

export default function Input(props: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={"#8D8D99"}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#202024",
    height: 50,
    borderColor: "#323238",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    color: "#E1E1E6",
    fontSize: 16,
    width: "100%",
  },
});
