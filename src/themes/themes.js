import {
  Black,
  White,
  gradientColor,
  gradientTransparent, BUBBLELEFT, BUBBLERIGHT, TEXTCOLOR, INFOTEXTCOLOR, TIMETEXTCOLOR, PINK, BORDER,
} from './constantColors';

export const THEMES = [
  {
    key: 'DARK',
    gradientColors: gradientColor,
    gradientTransparentColors: gradientTransparent,
    container: {
      backgroundColor: Black,
      headerTextColor: White,
    },
    primaryColor: White,
    subPrimaryColor: White,
    secondaryColor: White,
    subSecondaryColor: White,
    pinkColor: PINK,
    borderColor: BORDER,
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
          backgroundColor: BUBBLELEFT
        },
        text: {
          color: Black
        }
      },
    }
  },
  {
    key: 'LIGHT',
    gradientColors: gradientColor,
    gradientTransparentColors: gradientTransparent,
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
