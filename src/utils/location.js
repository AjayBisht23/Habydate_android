import Geolocation from '@react-native-community/geolocation';
import {getStore} from '../../App';
import {GET_LOCATION} from '../actions/types';
import {updateUserDataAction} from '../actions/authAction';
import auth from '@react-native-firebase/auth';
import geohash from "ngeohash";

function setLocationConfiguration() {
    Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse'
    });
}

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        setLocationConfiguration();
        Geolocation.getCurrentPosition((position) => {
            if (Boolean(position.coords)) {
                let coords = position.coords;
                getStore.dispatch({type: GET_LOCATION, payload: coords});
                const latitude = coords.latitude;
                const longitude = coords.longitude;
                const geoHash = geohash.encode(latitude, longitude);
                updateUserDataAction(auth().currentUser._user.uid, {location: {latitude, longitude, geoHash}});
            }
            resolve(position)
        }, error => {
                reject(error.code);
        });
    });
}

