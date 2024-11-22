import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";

type Props = {
  label: string;
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
};

export default function Select({ label, options, onValueChange }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    options[0]?.value || ""
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsModalVisible(true)}
      >
        {selectedValue ? (
          <Text style={styles.inputText}>
            {options.find((option) => option.value === selectedValue)?.label}
          </Text>
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              style={styles.flatList} // Ensure the list is scrollable
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    color: "#8D8D99",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#202024",
    height: 50,
    borderColor: "#323238",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    color: "#E1E1E6",
  },
  inputText: {
    color: "#E1E1E6",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#202024",
    width: "80%",
    borderRadius: 8,
    padding: 20,
    maxHeight: "60%", // Set a max height for the modal content to enable scroll
  },
  flatList: {
    maxHeight: "80%", // Makes the FlatList scrollable if there are many items
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    color: "#E1E1E6",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#323238",
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeText: {
    color: "#E1E1E6",
    textAlign: "center",
    fontSize: 16,
  },
});
