import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    main: string;
    sub: string;
    text: string;
    defaultText: string;
    buttonText: string;
    border: string;
    light: string;
  }
}
