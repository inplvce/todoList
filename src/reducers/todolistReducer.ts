import {v1} from "uuid";
import {TodoListsType} from "../App";

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
type ChangeTodolistActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {
        id: string
        title: string
    }
}



type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType

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
        }
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