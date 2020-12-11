import {THEME} from '../services/types';
import {THEMES} from '../themes/themes';

const initialState = {
  theme: THEMES[0],
};

function theme(state = initialState, action) {
  if (action.type === THEME) {
    return {...state, theme: action.payload};
  } else {
    return state;
  }
}

export default theme;
