import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Dimensions,
  Pressable,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { theme } from "../utils/Styles";
import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SERVER_URL } from "../utils/Helpers";
import LoadingScreen from "../components/LoadingOverlay";
import ScanningOverlay from "../components/ScanningAnimation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BoundingBox, Item, Receipt, TabParamList, User } from "../utils/Types";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import BoundingBoxOverlay from "../components/BoundingBoxOverlay";

const ScannerScreen = () => {
  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [flashOn, setFlashOn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [bbox, setBbox] = useState<BoundingBox>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState<Receipt | null>(null);
  const [items, setItems] = useState<Item[] | null>();
  const [tempCurrUser, setTempCurrUser] = useState<User>({
    userID: 69,
    username: "Mary Jane",
    email: "mary.jane@gmail.com",              
    salt: "some_salt",
    createdAt: new Date(),
    healthConditions: null,
    healthGoals:  null,
  });

  useEffect(() => {
    requestPermissions();
    handleBoundingBoxSelection();
  }, []);

  const handleBoundingBoxSelection = () => {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const width = 0.8 * windowWidth;
    const height = 0.4 * windowHeight;

    const x = (windowWidth - width) / 2;
    const y = (windowHeight - height) / 6;

    setBbox({ x, y, width, height });
  };

  const cropImage = async (imageUri: string) => {
    const { x, y, width, height } = bbox;
    const croppedImage = await manipulateAsync(
      imageUri,
      [{ crop: { originX: x, originY: y, width, height } }],
      { compress: 1, format: SaveFormat.JPEG }
    );
    return croppedImage.uri;
  };

  const navigation = useNavigation<StackNavigationProp<TabParamList>>();

  const navigateToHomeScreen = () => {
    navigation.navigate("Home");
  };

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

      let textFromImage = "";
      response.data.textFromImage.forEach((line: string) => {
        textFromImage += line; 
      });

      const requestData = {
        receiptData: textFromImage,
        healthGoals: tempCurrUser.healthGoals,
        healthConditions: tempCurrUser.healthConditions
      };
      
      const receiptScanResponse = await axios.post(`${SERVER_URL}/receipt/scan`, requestData)
        .catch(error => {
          console.error('Error:', error);
        });

      return (receiptScanResponse as AxiosResponse<any, any>).data;
    } catch (error: unknown) {
      console.error("Error:", error);
      return false;
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
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
      // const croppedImage = await cropImage(photo.uri)
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

  if (!hasCameraPermission) {
    Alert.alert("Error!", "No Access to Camera!");
  }

  const readReceipt = async () => {
    try {
    setLoading(true);
    const picture = await takePicture();
    const response = await sendReceiptToServer(picture as string);
    console.log(response);
    } catch (error) {
      console.log("Error reading receipt", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <>
          <View style={styles.cameraButtonContainer}>
            <Pressable
              style={styles.scannerHeaderButton}
              onPress={navigateToHomeScreen}
            >
              <Icon
                name="arrow-back"
                size={24}
                color={theme.colors.background}
              />
            </Pressable>
            {flashOn ? (
              <Pressable
                style={styles.scannerHeaderButton}
                onPress={toggleFlash}
              >
                <Icon
                  name="flash-on"
                  size={24}
                  color={theme.colors.background}
                />
              </Pressable>
            ) : (
              <Pressable
                style={styles.scannerHeaderButton}
                onPress={toggleFlash}
              >
                <Icon
                  name="flash-off"
                  size={24}
                  color={theme.colors.background}
                />
              </Pressable>
            )}
          </View>
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            flashMode={flashOn ? FlashMode.on : FlashMode.off}
            useCamera2Api
            autoFocus
          >
            <BoundingBoxOverlay boundingBox={bbox} />
          </Camera>
        </>
      ) : (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flashOn ? FlashMode.on : FlashMode.off}
          useCamera2Api
          autoFocus
        >
          <Pressable
            style={styles.scannerHeaderButton}
            onPress={navigateToHomeScreen}
          >
            <Icon name="arrow-back" size={24} color={theme.colors.background} />
          </Pressable>
          {flashOn ? (
            <Pressable style={styles.scannerHeaderButton} onPress={toggleFlash}>
              <Icon name="flash-on" size={24} color={theme.colors.background} />
            </Pressable>
          ) : (
            <Pressable style={styles.scannerHeaderButton} onPress={toggleFlash}>
              <Icon
                name="flash-off"
                size={24}
                color={theme.colors.background}
              />
            </Pressable>
          )}
          <BoundingBoxOverlay boundingBox={bbox} />
        </Camera>
      )}
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
    bottom: 0,
    left: 0,
    width: "100%",
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
  cameraButtonContainer: {
    height: "13%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
    zIndex: 2,
  },
  scannerHeaderButton: {
    backgroundColor: theme.colors.faded,
    width: 35,
    height: 35,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
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
});

export default ScannerScreen;
