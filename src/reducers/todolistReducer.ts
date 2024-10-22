import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";

//
// type RemoveTodolistActionType = {
//     type: 'REMOVE_TODOLIST',
//     payload: {
//         id: string
//     }
// }

// type AddTodolistActionType = {
//     type: 'ADD_TODOLIST',
//     payload: {
//         title: string
//     }
// }
// type ChangeTodolistTitleActionType = {
//     type: 'CHANGE_TODOLIST_TITLE',
//     payload: {
//         id: string
//         title: string
//     }
// }

// type ChangeTodolistFilterActionType = {
//     type: 'CHANGE_TODOLIST_FILTER',
//     payload: {
//         id: string
//         filter: FilterValuesType
//     }
// }

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

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
            const actionTyped = action as RemoveTodolistActionType;
            return state.filter(tl => tl.id !== actionTyped.payload.id);
        }
        case 'ADD_TODOLIST': {
            const actionTyped = action as AddTodolistActionType;
            const newTodo = {id: v1(), title: actionTyped.payload.title, filter: 'all'}
            const newState = [...state, newTodo]
            return newState
        }
        case 'CHANGE_TODOLIST_TITLE': {
            const actionTyped = action as ChangeTodolistTitleActionType;
            return [...state.map((tl) => tl.id === actionTyped.payload.id ? {...tl, title: actionTyped.payload.title} : tl)]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            const actionTyped = action as ChangeTodolistFilterActionType;
            return [...state.map((tl) => tl.id === actionTyped.payload.id ? {...tl, filter: actionTyped.payload.filter} : tl)]
        }

        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id: todolistId
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            title: title
        }
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id: id,
            title: title
        }
    }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        payload: {
            id: id,
            filter: filter
        }
    }
}

