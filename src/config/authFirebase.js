import {AccessToken, LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {checkUserExits, createNewUserDataAction, updateUserDataAction} from '../actions/authAction';
import {regex} from '../utils/regex';

export const signInPhone = async (phone) => {
    return auth().signInWithPhoneNumber(phone)
};

export const getFacebookData = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled)
        throw 'User cancelled the login process';

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data)
        throw 'Something went wrong obtaining access token';

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
};

export const getGoogleData = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
};

export const getUserDataAndUpdateInFirestore = (response) => {
    return new Promise((resolve, reject) => {
        let user = response.user;
        let getUser = user._user;
        if (getUser) {
            let uid = getUser.uid;
            let parameter = {
                uid: uid,
                name: regex.isEmpty(getUser.displayName) ? '' : getUser.displayName,
                email: regex.isEmpty(getUser.email) ? '' : getUser.email,
                profilePic: regex.isEmpty(getUser.photoURL) ? '' : getUser.photoURL,
            };
            checkUserExits(uid).then((getUser) => {
                if (getUser.exists) {
                    resolve({exists: getUser.exists, user: getUser.data()});
                } else {
                    parameter.stepCompleted = 0;
                    createNewUserDataAction(uid, parameter).then(() => {
                        resolve({exists: getUser.exists, user: parameter}); // New User Added
                    });
                }
            });
        } else
            reject('Something went wrong.')
    });
};
