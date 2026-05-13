import { light, type CharcoalTheme, type CharcoalAbstractTheme } from '@charcoal-ui/theme';
import { themeSelector } from '@charcoal-ui/styled';

// この辺はcharcoal v4以降で型エラーになるのを対処するための記述
export type ExampleTheme = typeof light & CharcoalTheme;

declare module 'styled-components' {
  interface DefaultTheme extends ExampleTheme {} // eslint-disable-line @typescript-eslint/no-empty-object-type
}

export interface ThemeMap<T extends Pick<CharcoalAbstractTheme, 'color' | 'effect' | 'border'>> {
  ':root': T;
  [mediaQuery: `@media (${string})`]: T;
  [selector: string]: T;
}

export const themeMap: ThemeMap<CharcoalTheme> = {
  ':root': light,
  [themeSelector('light')]: light,
};
