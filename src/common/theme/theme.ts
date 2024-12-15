// actions.ts
export const TOGGLE_THEME = 'TOGGLE_THEME';

export type ToggleThemeAction = {
    type: typeof TOGGLE_THEME;
};

export const toggleTheme = (): ToggleThemeAction => ({
    type: TOGGLE_THEME
});