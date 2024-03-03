import { Platform } from "react-native";

export const SERVER_URL =
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_IOS_SERVER_URL
    : "http://10.0.2.2:3000";

export const demoItems = [
  {
    itemID: 1,
    receiptID: 1,
    name: "Apple",
    quantity: 4,
    weight: null,
    expiryDate: new Date(),
    price: 5.2,
    healthRating: 3,
    healthComment:
      "An apple a day keeps the doctor away. Fruits are an important part of your everyday diet!",
    art: "https://pngfre.com/wp-content/uploads/apple-poster.png",
  },
  {
    itemID: 2,
    receiptID: 2,
    name: "Oranges",
    quantity: 2,
    weight: null,
    expiryDate: new Date(2024, 2, 25),
    price: 3,
    healthRating: 4,
    healthComment: "Noodles are good for you.",
    art: "https://www.pearsonranch.com/wp-content/uploads/Cut-Whole-Oranges-Product-GY1vZ1-1.png",
  },
  {
    itemID: 3,
    receiptID: 3,
    name: "Grapes",
    quantity: 5,
    weight: null,
    expiryDate: new Date(2024, 2, 23),
    price: 3,
    healthRating: 4,
    healthComment: "Noodles are good for you.",
    art: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25d45014-8cc3-4c98-b02c-5a0cf3a55ddd/ddfrpyt-7b2f2fe3-9f1c-4048-98a2-f26a877dd5de.png/v1/fill/w_900,h_667/white_grapes_on_a_transparent_background__by_prussiaart_ddfrpyt-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjY3IiwicGF0aCI6IlwvZlwvMjVkNDUwMTQtOGNjMy00Yzk4LWIwMmMtNWEwY2YzYTU1ZGRkXC9kZGZycHl0LTdiMmYyZmUzLTlmMWMtNDA0OC05OGEyLWYyNmE4NzdkZDVkZS5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.z6E_mhgn3Ilm-gpUl8ObR8EpqamZR7-yAifyiPTcKqE",
  },
];