import {LOGIN} from './types';
import {usersCollection} from './../config/firestore';

export function loginSuccess(data) {
    return {
        type: LOGIN,
        payload: data
    }
}

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
