import * as Notifications from "expo-notifications";

const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Your Apple is About to Expire! ⚠️`,
      body: "You have three days left!",
      data: {},
    },
    trigger: { hour: 15, minute: 49, second: 0, repeats: false },
  });
};

export default schedulePushNotification;
