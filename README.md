## Install and run on android

```
npm install -g react-native-cli
cd Epicbae
npm install
react-native run-android
```

## Install and run on ios

```
npm install -g react-native-cli
cd Epicbae
npm install
react-native run-ios
```

## Mobile and Firebase App Configuration

### Run app

- Go to the ​project​ ​directory​ folder
- Run ​npm install
- Open a code editor of your choice.

> iOS

- Go to ios folder using terminal
- Run ​pod install
- Back to project directory
- Run ​react-native run-ios

> Android

- Run ​react-native run-android

### Firebase configuration for your app

- Create a new account on​ ​Firebase.com
- Create a new project in​ ​Firebase Console
- Enable Phone, Google & Facebook auth method in ​Firebase Console​ / ​Authentication​ /
  Sign-in method
- Create a new iOS app, with App ID ​com.example
- Create a new Android app with package name ​com.example
- Download the configuration file generated at the next step to your computer (​GoogleService-Info.plist​ for iOS, and ​google-services.json​ for Android)
- Create database from Cloud Firestore

### Cloudinary Storage for media upload

- Create a new account on ​https://cloudinary.com/
- The account details section on the ​Dashboard​ page shows your ​cloud name​ identifier, as
  well as your ​API key​ and ​secret​, which you will need in order to ​configure your SDK​ or to directly run API requests.
- Create a Upload Presets
- Go to the ​Dashboard​ page, Press on the ​settings​ icon on the right side.
- Under the ​settings​, Tap on upload and scroll down and you show upload presets
- ​Add upload presets​, You have to select the ​unsigned​ option on ​Signing Mode:​ and Save it. Please ​Note​ down ​Upload preset name
- More Information ​https://cloudinary.com/documentation/how_to_integrate_cloudinary

### Stripe payment gateway

- Create a new account on ​https://dashboard.stripe.com/register
- Fill out the form to create account
- Get the key ​https://dashboard.stripe.com/account/apikeys
- More Information https://www.paulisystems.net/how-to-create-a-stripe-account-for-online-payment-processi ng/?cn-reloaded=1&cn-reloaded=1

### How to make own application

- Go to the project ​directory​ folder
- Open a code editor of your choice.
- Go to ​src​ folder, Under ​config/config.js​ file
- Update ​config.js​ file
- ​WEB_CLIENT​: Get this value from firebase (Under ​Firebase console / Authentication / Sign in Method / Google / Web SDK Configuration​)
- ​CLOUDINARY_PRESENT_NAME​: Get this value from Cloudinary (​Cloudinary dashboard / Settings / Upload / ​Upload Presets​ / ​Preset Name​)
- ​CLOUDINARY_CLOUD_NAME​: Get this value from Cloudinary (​Cloudinary dashboard / Cloud Name​)
- ​STRIPE_PUBLIC_KEY: ​Get this value from Stripe (​Dashboard / Developer / API Keys​)
- ​STRIPE_CLOUD_SERVER_URL: ​Get this value from Stripe (​Dashboard / Developer / API Keys​)
- ​IS_STRIPE_LIVE: ​Set true if you use live STRIPE_PUBLIC_KEY otherwise false

### Firebase app configuration

> iOS

- Go to ios/Epicbae folder
- Replace the GoogleService-Info.plist file with your GoogleService-Info.plist file

> Android

- Go to android/app folder
- Replace the google-services.json file with your google-services.json file

### Facebook app

> iOS

- Go to ios/Epicbae/Info.plist file
- Replace FacebookAppID with your FacebookAppID
- Replace FacebookDisplayName with your FacebookDisplayName

> Android

- Go to android/app/src/main/res/values/strings.xml file
- Replace facebook_app_id with your facebook_app_id
- Replace fb_login_protocol_schema with your fb_login_protocol_schema

### Step up stripe payment gateway using firebase cloud function

- Go to ​functions/index.js​ file
- Replace STRIPE_SECRET_KEY with your STRIPE_SECRET_KEY
- Guide for Stripe payment with Firebase Cloud function
  https://medium.com/enappd/stripe-payment-integration-in-react-native-apps-using-firebase-926c3b1f1448

### Run

- If you would like to ​run​ the app in ​Android​, you need to connect an Android phone to a system or you can ​run​ the app on an ​Android​ ​emulator​. Type ​react-native run-android​ Make sure that you have configured the AVD before running the command. If you would like to ​run​ the app on an ​iPhone​ ​simulator​(MacOS), run ​react-native run-ios​. ​NOTE:​ Make sure you run the Epicbae.xcworkspace​ project
