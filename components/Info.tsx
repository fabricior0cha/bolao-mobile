import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
interface Props {
  children: React.ReactNode;
}
export default function Info(props: Props) {
  return (
    <TouchableOpacity style={{ ...styles.container }}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b2a429",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
