import {SET_USER_DATA} from './types';
import {usersCollection} from './../config/firestore';
import {getStore} from '../../App';
import {CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESENT_NAME} from '../config/config';

export function createNewUserDataAction(uid, parameter) {
    return new Promise((resolve, reject) => {
        usersCollection.doc(uid).set(parameter).then((response) => {
            return resolve(response)
        }).catch(error => {
            return reject(error)
        });
    });
}

export function updateUserDataAction(uid, parameter) {
    return new Promise((resolve, reject) => {
        usersCollection.doc(uid).update(parameter).then((response) => {
            return resolve(response)
        }).catch(error => {
            return reject(error)
        });
    });
}

export function checkUserExits(uid) {
    return new Promise((resolve, reject) => {
        usersCollection.doc(uid).get().then((response) => {
            return resolve(response);
        });
    });
}

export function deleteUser(uid) {
    return new Promise((resolve, reject) => {
        usersCollection.doc(uid).delete().then(() => {
           resolve(true)
        });
    });
}

export function getUserData(uid) {
    return new Promise((resolve, reject) => {
        checkUserExits(uid).then((getUser) => {
            if (getUser.exists) {
                getStore.dispatch({
                   type: SET_USER_DATA,
                   payload: getUser.data()
                });
                resolve({user: getUser.data()});
            } else
                reject({user: null});
        });
    });
}

export function cloudinaryUpload(photo) {
    return new Promise((resolve, reject) => {
        const data = new FormData();
        let media = {
            uri: photo.path,
            type: photo.mime,
            name: new Date().valueOf().toString()+'.png',
        };
        data.append('file', media);
        data.append('upload_preset', CLOUDINARY_PRESENT_NAME);
        data.append('cloud_name', CLOUDINARY_CLOUD_NAME);
        fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
            method: 'post',
            body: data
        }).then(res => res.json()).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    });
}
