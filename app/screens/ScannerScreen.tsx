import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { theme } from "../utils/Styles";
import axios from "axios";
import FormData from "form-data";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SERVER_URL } from "../utils/Helpers";
import LoadingScreen from "../components/LoadingOverlay";
import ScanningOverlay from "../components/ScanningAnimation";

const ScannerScreen = () => {
  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const sendReceiptToServer = async (photoUri: string) => {
    try {
      takePicture();

      const formData = new FormData();

      // Changes fileUri path based on platform.
      const fileUri =
        Platform.OS === "android" ? photoUri : photoUri.replace("file://", "");

      // Uses file's name.
      const fileName = fileUri.split("/").pop();

      formData.append("image", {
        uri: fileUri,
        name: fileName,
        type: `image/jpeg`,
      });

      // Send the file to the server for analysis.
      const response = await axios.post(
        `${SERVER_URL}/receipt/read`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check if the request was successful
      if (response.status !== 200) {
        throw new Error("Failed to upload file to the server");
      }

      response.data.textFromImage.forEach((line: string) => {
        console.log(line);
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Error:", error);
      return false;
    }
  };

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    if (cameraRef.current) {
      const photo = await (cameraRef.current as Camera).takePictureAsync(
        options
      );
      setCapturedPhoto(photo.uri);
      return photo.uri;
    } else {
      console.error("Camera handle is null");
      return null;
    }
  };

  const requestPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraPermission.status === "granted");
  };

  if (hasCameraPermission === null) {
    // Alert.alert("Error!", "Camera permission not granted!"); SOMETHING WRONG HERE
  } else if (!hasCameraPermission) {
    Alert.alert("Error!", "No Access to Camera!");
  }

  const readReceipt = async () => {
    const picture = await takePicture();
    const response = sendReceiptToServer(picture as string);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
      <ScanningOverlay />
      <View style={styles.scannerInfoContainer}>
        <TouchableOpacity style={styles.button} onPress={readReceipt}>
          <Icon
            name="document-scanner"
            size={40}
            color={theme.colors.background}
          />
        </TouchableOpacity>
      </View>

      <LoadingScreen loading={loading} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scannerInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    height: "25%",
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
  buttonContainer: {
    width: 75,
    marginRight: theme.spacing.md,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonLabel: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 70,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
  },
  camera: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  capturedPhoto: {
    flex: 1,
    overflow: "hidden",
    height: 800,
  },
  clockedInStatus: {
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  onBreakStatus: {
    backgroundColor: theme.colors.warning,
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  clockOutOptions: {
    display: "flex",
    flexDirection: "row",
  },
});

export default ScannerScreen;
