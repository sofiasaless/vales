import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, TouchableOpacity } from "react-native";
import { customTheme } from "../theme/custom.theme";

export function LixeiraItem({ action }: { action: () => void }) {
  return (
    <TouchableOpacity onPress={action} style={styles.removeButton}>
      <Feather name="trash" size={15} color={customTheme['color-danger-600']} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  removeButton: {
    borderRadius: 999,
    padding: 7,
    backgroundColor: customTheme['background-transparent-danger']
  },
});