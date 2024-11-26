import { v1 } from "uuid";
import { FilterValuesType, TodolistsType } from "../AppWithRedux";

// Типы экшенов
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState: TodolistsType[] = [];

// Редюсер
export const todolistsReducer = (state: TodolistsType[] = initialState, action: ActionType): TodolistsType[] => {
    debugger
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id);

        case 'ADD_TODOLIST':
            return [
                ...state,
                { id: action.payload.todolistId, title: action.payload.title, filter: 'all' }
            ];

        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl);

        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl);

        default:
            return state;
    }
};

// Action creators
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE_TODOLIST',
    payload: { id: todolistId }
} as const);

export const addTodolistAC = (title: string) => ({
    type: "ADD_TODOLIST",
    payload: { todolistId: v1(), title}
} as const);

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    payload: { id, title }
} as const);

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE_TODOLIST_FILTER",
    payload: { id, filter }
} as const);