// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      darkBg: string,
      lightBg: string
      details: string,
      markText: string,
      text: string,
      cardSkill: string,
    }
  }
}
