import {
  Black,
  White,
  gradientColor,
  gradientTransparent,
  BUBBLELEFT,
  BUBBLERIGHT,
  TEXTCOLOR,
  INFOTEXTCOLOR,
  TIMETEXTCOLOR,
  PINK,
  BORDER,
  LIGHTWHITE,
  PRIMARYB,
} from './constantColors';

export const THEMES = [
  {
    key: 'LIGHT',
    container: {
      backgroundColor: White,
      headerTextColor: Black,
    },
    backgroundColor: White,
    primaryBackgroundColor: PRIMARYB,
    primaryColor: Black,
    subPrimaryColor: INFOTEXTCOLOR,
    secondaryColor: TEXTCOLOR,
    subSecondaryColor: TIMETEXTCOLOR,
    pinkColor: PINK,
    borderColor: BORDER,
    textInputBackgroundColor: LIGHTWHITE,
    chatTheme: {
      backgroundColor: Black,
      left: {
        wrapper: {
          backgroundColor: BUBBLELEFT
        },
        text: {
          color: Black
        }
      },
      right: {
        wrapper: {
          backgroundColor: BUBBLERIGHT
        },
        text: {
          color: White
        }
      },
    }
  },
  {
    key: 'DARK',
    container: {
      backgroundColor: White,
      headerTextColor: Black,
    },
    backgroundColor: White,
    primaryColor: Black,
    subPrimaryColor: INFOTEXTCOLOR,
    secondaryColor: TEXTCOLOR,
    subSecondaryColor: TIMETEXTCOLOR,
    pinkColor: PINK,
    borderColor: BORDER,
    textInputBackgroundColor: LIGHTWHITE,
    chatTheme: {
      backgroundColor: Black,
      left: {
        wrapper: {
          backgroundColor: BUBBLELEFT
        },
        text: {
          color: Black
        }
      },
      right: {
        wrapper: {
          backgroundColor: BUBBLERIGHT
        },
        text: {
          color: White
        }
      },
    }
  },
];
