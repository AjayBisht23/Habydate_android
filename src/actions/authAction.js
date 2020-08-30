import {SET_USER_DATA} from './types';
import {usersCollection} from './../config/firestore';
import {getStore} from '../../App';

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
