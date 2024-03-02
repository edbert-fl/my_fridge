import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import type { PropsWithChildren } from "react";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppHeader from "../components/AppHeader";
import { commonStyles, theme } from "../utils/Styles";
import { ScannerParamList } from "../utils/Types";
import { StackNavigationProp } from "@react-navigation/stack";

type ItemsScreenRouteProp = RouteProp<ScannerParamList, "ItemScreen">;

interface ItemsScreenProps {
  route: ItemsScreenRouteProp;
}

const ItemScreen: React.FC<ItemsScreenProps> = ({ route }) => {
  const { itemID, justAdded } = route.params;
  const scannerNavigation =
    useNavigation<StackNavigationProp<ScannerParamList>>();
  const initialdata = {
    name: "Apple",
    quantity: 20,
    expiryDate: new Date(),
    weight: "3kg",
    price: 13,
    healthRating: 4,
    healthComment:
      "Apples are not only delicious but also incredibly nutritious. Packed with fiber, vitamins, and antioxidants, they promote good digestive health, lower the risk of chronic diseases like heart disease.",
  };

  const leafRatingOptions = [1, 2, 3, 4, 5];
  const [popupVisible, setPopupVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [data, setData] = useState(initialdata);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === "ios");
  const [leafRating, setleafRating] = useState(data.healthRating);
  const animatedButtonScale = new Animated.Value(1);

  //DatePicker
  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  // Edit Popup
  type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

  const FadeInView: React.FC<FadeInViewProps> = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}
      >
        {props.children}
      </Animated.View>
    );
  };

  const openPopup = (value: string, field: string) => {
    setPopupVisible(true);
    setTextInputValue(value);
    setSelectedField(field);
  };

  // leafs

  const handlePressIn = (option: number) => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = (option: number) => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  const navigation = useNavigation();

  // Editing Changes
  const saveChanges = (newValue: string) => {
    const updatedData = { ...data };
    switch (selectedField) {
      case "name":
        updatedData.name = newValue;
        break;
      case "quantity":
        updatedData.quantity = parseInt(newValue);
        break;
      case "expiryDate":
        updatedData.expiryDate = new Date(newValue);
        break;
      case "weight":
        updatedData.weight = newValue;
        break;
      case "price":
        updatedData.price = parseFloat(newValue);
        break;
      case "healthComment":
        updatedData.healthComment = newValue;
        break;
      default:
        break;
    }
    setData(updatedData);
    setPopupVisible(false);
  };
  return (
    <View style={styles.container}>
      <AppHeader
        title={"Items"}
        onBackIcon={
          <Icon name="arrow-back" size={24} color={theme.colors.background} />
        }
        onBackPress={() => scannerNavigation.goBack()}
      />
      <SafeAreaView style={commonStyles.safeAreaView}>
        {/*Image*/}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://domf5oio6qrcr.cloudfront.net/medialibrary/11525/0a5ae820-7051-4495-bcca-61bf02897472.jpg",
            }}
            style={styles.image}
          />
        </View>
        {/*Title*/}
        <View style={styles.editContainer}>
          <TextInput style={styles.h1} value={data.name} editable={false} />
          <TouchableOpacity onPress={() => openPopup(data.name, "name")}>
            <Icon name="edit" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        {/*HealthRating*/}
        <View style={styles.ratingContainer}>
          <View style={styles.leafs}>
            {leafRatingOptions.map((option) => (
              <TouchableWithoutFeedback
                onPressIn={() => handlePressIn(option)}
                onPressOut={() => handlePressOut(option)}
                key={option}
              >
                <Animated.View style={animatedScaleStyle}>
                  <MaterialIcons
                    name={leafRating >= option ? "eco" : "eco"}
                    size={25}
                    style={
                      leafRating >= option
                        ? styles.leafSelected
                        : styles.leafUnselected
                    }
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
        {/*Quantity*/}
        <View style={styles.editContainer}>
          <Text style={styles.h2}>Quantity</Text>
          <TextInput
            style={styles.p}
            value={data.quantity.toString()}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => openPopup(data.quantity.toString(), "quantity")}
          >
            <Icon name="edit" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        {/*ExpiryDate*/}
        <View style={styles.editContainer}>
          <Text style={styles.h2}>Expiry Date </Text>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={styles.DateTimePicker}
            />
          )}
        </View>
        {/*Weight*/}
        <View style={styles.editContainer}>
          <Text style={styles.h2}>Weight</Text>
          <TextInput style={styles.p} value={data.weight} editable={false} />
          <TouchableOpacity onPress={() => openPopup(data.weight, "weight")}>
            <Icon name="edit" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.healthComment}>{data.healthComment}</Text>
        <View style={styles.buttonContainer}>
          {justAdded ? (
            <Button
              title="Save"
              titleStyle={{ fontWeight: "bold", fontSize: 20 }}
              buttonStyle={{
                backgroundColor: theme.colors.primary,
                height: 50,
                width: 130,
                borderRadius: 10,
              }}
            />
          ) : (
            <>
              <Button
                title={"Eat"}
                titleStyle={{ fontWeight: "bold", fontSize: 20 }}
                color="red"
                buttonStyle={{
                  backgroundColor: theme.colors.primary,
                  height: 50,
                  width: 130,
                  borderRadius: 10,
                }}
              />
              <Button
                title={"Trash"}
                titleStyle={{ fontWeight: "bold", fontSize: 20 }}
                color="red"
                buttonStyle={{
                  backgroundColor: theme.colors.accent,
                  height: 50,
                  width: 130,
                  borderRadius: 10,
                }}
              />
            </>
          )}
        </View>

        {popupVisible && (
          <FadeInView style={styles.popupContainer}>
            <View style={styles.popupContent}>
              <Text style={styles.popupTitle}>Edit {selectedField}</Text>
              <TextInput
                style={styles.popupInput}
                value={textInputValue}
                onChangeText={setTextInputValue}
              />
              <TouchableOpacity
                style={styles.popupButton}
                onPress={() => saveChanges(textInputValue)}
              >
                <Text style={styles.popupButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </FadeInView>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
  },
  imageContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  h1: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 50,
    fontWeight: "600",
    marginLeft: 20,
  },
  h2: {
    flex: 1,
    color: theme.colors.text,
    padding: 5,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
  },
  p: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 20,
    marginRight: 35,
  },
  label: {
    marginLeft: 10,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingRight: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  healthComment: {
    color: theme.colors.text,
    fontSize: 20,
    fontStyle: "italic",
    padding: 25,
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  popupButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  popupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  leafs: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 20,
  },
  leafUnselected: {
    color: "#aaa",
  },
  leafSelected: {
    color: "#008000",
  },
  DateTimePicker: {
    marginRight: 120,
  },
});

export default ItemScreen;
