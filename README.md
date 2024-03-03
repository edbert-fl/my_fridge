## 🌱 Inspiration 

Food waste is a big global issue. On a personal level, I myself have often found myself in a situation where I am at the supermarket, thinking about whether my food at home has already gone bad, and whether what I'm buying will do well for my health in the long run. Sure, there are food management apps out there, but they are inconvenient requiring tedious manual input data manually each time which gets tiring really fast.

But what if you could enjoy the benefits of a food tracking app without the hassle of constant input? Enter MyFridge – your solution to effortless food management. With MyFridge, you can say goodbye to guesswork and hello to streamlined grocery trips, healthier choices, and timely reminders.

## 📱What it does

### **Scan any receipt**

Just by using the phone's native camera we are able to read from any receipt from any store and extract all the necessary information that MyFridge needs. All at the click of a button!

### **Get personalized health suggestions**

With every scan, MyFridge provides personalized health ratings and recommendations tailored to your specific health conditions and goals, offering insightful guidance for each item. Utilizing your unique health profile and purchases, MyFridge delivers customized recommendations, ensuring that each suggestion is perfectly tailored to your individual needs and preferences. 

### **Remind you of Expiry dates**

Simply by analyzing item names, MyFridge offers accurate estimates for expiry dates, with the flexibility for users to fine-tune specifics as needed. This proactive feature empowers users by alerting them to impending expiry dates, ensuring they stay ahead of food spoilage and waste.

## 🚀 How we built it

### **Frontend**

For the frontend we used React Native using Expo, allowing our app to run on both iOS and Android. Everything was written in typescript for type safety ensuring that code is reliable and readable.

### **Backend**

Our robust backend, crafted with Node.js and JavaScript, seamlessly communicates using Axios for efficient API interactions. Leveraging a custom database infrastructure with encryption protocols, we ensure the utmost security for sensitive user data, prioritizing privacy and reliability at every step.

### **APIs**

_**Microsoft Azure Vision Read API**_: Used for optical character recognition

_**ChatGPT-3.5 Turbo**_: Used for generating health ratings and comments

## 🛑 Challenges we ran into

### **Navigation**

We use different navigation for different parts of the app like stack navigation for login/register pipeline and for the receipt history to items Pipeline, while also having a bottom tab navigation system for other parts of our app. This makes designing apps that feel intutive for the user much more complicated, but by going through it step by step we were able to resolve this issue.

### **Database**

We chose to create a backend from scrap instead of using something like Firebase because we started the project being more ambitious and wanted a lot of features that required something custom. However it became troublesome because there were a lot of issues that resulted from problems in the database like typos, incorrect data types etc. More planning would have been better to avoid these kinds of issues in the future.

## 🏆 Accomplishments that we're proud of

### **Accurate image detection and recommendations**

MyFridge is able to accurately detect words on receipts, extract the data we are interested in and create useful health recommendations based on a user's existing conditions and goals from their health record.

### **Clean and User-friendly UI**

We were able to create a clean and user friendly UI that would be familiar to most people while also giving it a character of its own.

## 📚 What we learned

We all learned a lot from this unihack. Many of our team members were unfamiliar with React native, SQL and even what an API was! But in the end we were able to work together and create a great product by learning fast, working hard and most importantly working together.

## 🌅 What's next for MyFridge

### **_Instant Integration with Supermarket Chains_**

No more tedious shopping lists! MyFridge will seamlessly sync with your preferred supermarkets with a QR code provided at checkout.

### **_Pocket Nutritionist_**

Imagine having a personal nutrition advisor in your pocket. With MyFridge, simply scan the barcode of any food product and receive instant feedback based on your unique health condition.

### **_Generate a shopping list_**

Generate a new shopping list based on your previous order history and what's left in your fridge.
