// themeReducer.ts
import { TOGGLE_THEME, ToggleThemeAction } from './../common/theme/theme';

type ThemeState = {
    darkMode: boolean;
};

const initialState: ThemeState = {
    darkMode: false, // начальное состояние темы (светлая)
};

const themeReducer = (state = initialState, action: ToggleThemeAction): ThemeState => {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                darkMode: !state.darkMode, // переключение между темной и светлой темой
            };
        default:
            return state;
    }
};

export default themeReducer;