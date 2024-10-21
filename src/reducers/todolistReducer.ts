import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";


type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    payload: {
        id: string
    }
}
type AddTodolistActionType = {
    type: 'ADD_TODOLIST',
    payload: {
        title: string
    }
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {
        id: string
        title: string
    }
}

type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    payload: {
        id: string
        filter: FilterValuesType
    }
}


type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const todolistID1 = v1();
const todolistID2 = v1();


const initialState: TodoListsType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state: TodoListsType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return [...state.filter((tl) => tl.id !== action.payload.id)]
        }
        case 'ADD_TODOLIST': {
            const newTodo = {id: v1(), title: action.payload.title, filter: 'all'}
            const newState = [...state, newTodo]
            return newState
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return [...state.map((tl) => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return [...state.map((tl) => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)]
        }

        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id: id,
        },
    };
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            title: title
        }
    }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        payload: {
            id: id,
            title: title
        }
    }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        payload: {
            id: id,
            filter: filter
        }
    }
}

