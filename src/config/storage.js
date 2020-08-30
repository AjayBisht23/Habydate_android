import storage from '@react-native-firebase/storage';

export const uploadProfilePics = (response) => {
    return new Promise((resolve, reject) => {
        storage().ref(response.refName).putFile(response.path).then(async (snapshot) =>  {
            resolve(snapshot);
        })
    });
};

export const getProfilePic = async (refName) => {
    const url = await storage()
        .ref(refName)
        .getDownloadURL();

    console.log(url);
    return url;
};
