import {
    GET_LOCATION,
    HIDE_LOADER,
    LOGIN,
    LOGOUT,
    SET_USER_DATA,
    SHOW_LOADER,
    SWIPECARDLIMIT,
    THEME,
} from '../actions/types';
import {THEMES} from '../themes/themes';

const initialAuthState = {loading: true, user: null, theme: THEMES[0],
  showLoader: false, location: {latitude: 0.00, longitude: 0.00},
  swipeCardLimit: 0,
  mySendSeekerRequests: [],
  matches: [],
  seekerRequests: [], seekerUnreadCount: 0,
  peopleWhoLiked: [], whoLikedUnreadCount: 0,
  notifications: [], notificationCount: 0,
  conversations: [], conversationCount: 0,
};

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload, loading: false};

    case LOGOUT:
      return {...state, user: null, loading: false, peopleWhoLiked: [], seekerRequests: [], mySendSeekerRequests: [],
        matches: [], conversations: []};

    case THEME:
      return {...state, theme: action.payload};

    case SET_USER_DATA:
      return {...state, user: action.payload};

    case SHOW_LOADER:
      return {...state, showLoader: true};

    case HIDE_LOADER:
      return {...state, showLoader: false};

    case GET_LOCATION:
      return {...state, location: action.payload};

    case SWIPECARDLIMIT:
      return {...state, swipeCardLimit: action.payload};

    default:
      return state;
  }
}

export default auth;
