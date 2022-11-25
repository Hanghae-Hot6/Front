// import original module declarations
import 'styled-components';
import Theme from '../theme/Theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    MainColor: string;
    Black: string;
    Gray: string;
    LightGray: string;
    LightGray2: string;
    YellowKakao: string;
    LightPurple: string;
    LightPurple2: string;
    LightPurple3: string;
    DarkPurple: string;
    White: string;
    AliceBlue: string;
  }
}

// MainColor: string;
// Black: string;
// Gray: string;
// LightGray: string;
// YellowKakao: string;
// LightPurple: string;
// DarkPurple: string;
// White: string;
