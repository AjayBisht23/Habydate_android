import {GET_LOCATION} from '../services/types';

const initialState = {
  location: {latitude: 0.0, longitude: 0.0},
};

function location(state = initialState, action) {
  if (action.type === GET_LOCATION) {
    return {...state, location: action.payload};
  } else {
    return state;
  }
}

export default location;
