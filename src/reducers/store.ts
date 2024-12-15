import { combineReducers, legacy_createStore } from 'redux'
import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todolistsReducer";
import { createStore } from 'redux';
import themeReducer from './themeReducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    theme: themeReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store