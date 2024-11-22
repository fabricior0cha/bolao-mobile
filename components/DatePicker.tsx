import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  placeholder: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
};

export default function DatePicker({ placeholder, value, onChange }: Props) {
  const [show, setShow] = useState(false);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
        {value ? (
          <Text style={styles.text}>{value.toLocaleDateString()}</Text>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#202024",
    height: 50,
    borderColor: "#323238",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    color: "#E1E1E6",
  },
  text: {
    color: "#E1E1E6",
    fontSize: 16,
  },
  placeholder: {
    color: "#8D8D99",
    fontSize: 16,
  },
});