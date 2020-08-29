import {LOGIN, LOGOUT, SET_USER_DATA, THEME} from '../actions/types';
import {THEMES} from '../themes/themes';

const initialAuthState = {loading: true, user: null, theme: THEMES[0]};

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload, loading: false};

    case LOGOUT:
      return {...state, user: null, loading: false};

    case THEME:
      return {...state, theme: action.payload};

    case SET_USER_DATA:
      return {...state, user: action.payload};

    default:
      return state;
  }
}

export default auth;
