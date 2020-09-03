import {swipeCardsCollection, usersCollection} from '../config/firestore';
import geohash from "ngeohash";
import {getStore} from '../../App';
import {PEOPLE_WHO_LIKED} from './types';
import {getUserDetail} from './authAction';
import moment from 'moment';

export function distance(location, location1, unit) {
    let lat1 = location.latitude,
        lon1 = location.longitude,
        lat2 = location1.latitude,
        lon2 = location1.longitude;

    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    } else {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return dist;
    }
}

// Calculate the upper and lower boundary geohashes for
// a given latitude, longitude, and distance in miles
export const getGeoHashRange = (latitude: number, longitude: number, distance: number) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const greaterLat = latitude + lat * distance;
    const greaterLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(greaterLat, greaterLon);

    return {
        lower,
        upper
    };
};

export function discoverUsers(uid, location, distance) {
    return new Promise((resolve, reject) => {
        const { latitude, longitude } = location;
        const range = getGeoHashRange(latitude, longitude, distance);

        usersCollection
            .where('location.geoHash', '>=', range.lower)
            .where('location.geoHash', '<=', range.upper)
            .onSnapshot(snapshot => {
                if (Boolean(snapshot))
                    resolve(snapshot.docs);
            })
    });
}

export function checkSwipeExits(uid, other_uid) {
    return new Promise((resolve, reject) => {
        swipeCardsCollection
            .where('uid', '==', uid)
            .where('other_uid', '==', other_uid)
            .onSnapshot(snapshot => {
                if (Boolean(snapshot))
                    resolve(snapshot.docs.length);
            })
    });
}

export function swipeCardUser(uid, other_uid, action) {
    return new Promise((resolve, reject) => {
        checkSwipeExits(uid, other_uid).then(data => {
            if (data === 0) {
                swipeCardsCollection.add({uid, other_uid, action, createdAt: moment().utc().unix()}).then(() => {
                    console.log('User added!');
                });
            } else
                console.log('User already actioned!');
        })
    });
}

export function getWhoLikedMe(uid) {
    return new Promise((resolve, reject) => {
        swipeCardsCollection
            .where('other_uid', '==', uid)
            .where('action', '==', 'like')
            .onSnapshot(snapshot => {
                if (Boolean(snapshot)) {
                    let getUserInfo = [];
                    for (let v in snapshot.docs) {
                        let data = snapshot.docs[v]._data;
                        getUserInfo.push(getUserDetail(data));
                    }

                    Promise.all(getUserInfo).then(responseData => {
                        let response = [];
                        for (let v in responseData) {
                            let user = responseData[v].response._data;
                            let data = responseData[v].data;
                            response.push({
                                user,
                                ...data
                            })
                        }

                        getStore.dispatch({
                            type: PEOPLE_WHO_LIKED,
                            payload: response
                        });
                        resolve(response);
                    });
                }
            })
    });
}
