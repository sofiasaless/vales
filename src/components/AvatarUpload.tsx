import AntDesign from "@expo/vector-icons/AntDesign";
import { Button, Text } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { customTheme } from "../theme/custom.theme";
import { alert } from "../util/alertfeedback.util";

interface AvatarUploadProps {
  value?: string;
  onChange: (url: string) => void;
  textLabel?: string;
  titleLabel?: string;
  avatarFormat?: "circle" | "card";
  imageFormat: "1x1" | "3x4"
}

export const AvatarUpload = ({
  value,
  onChange,
  titleLabel = "Foto do funcionário",
  textLabel = "Selecionar imagem de perfil",
  avatarFormat = "circle",
  imageFormat = "1x1",
}: AvatarUploadProps) => {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    const imageAspect: [number, number] =
      imageFormat === "1x1" ? [1, 1] : [3, 4];

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: imageAspect,
      quality: 1,
    });

    if (result.canceled) return;
    onChange(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Text category="label">{titleLabel}</Text>

      {value ? (
        <Image source={{ uri: value }} style={styles.avatar} />
      ) : (
        <View
          style={[
            {
              ...styles.placeholder,
              borderRadius: avatarFormat === "card" ? 15 : 48,
            },
          ]}
        >
          <AntDesign name="cloud-upload" size={25} color="gray" />
        </View>
      )}

      <Button
        size="tiny"
        status="info"
        appearance="outline"
        onPress={pickImage}
        disabled={loading}
      >
        {loading ? "Enviando..." : textLabel}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    alignItems: "center",
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 48,
  },

  placeholder: {
    width: 80,
    height: 80,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  inputBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: customTheme["color-info-700"],
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 500,
  },
});
