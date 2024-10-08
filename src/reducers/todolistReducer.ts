import {v1} from "uuid";
import {TodoListsType} from "../App";

type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    payload: {
        id: string
    }
}

type ActionType = RemoveTodolistActionType

const todolistID1 = v1();
const todolistID2 = v1();


const initialState: TodoListsType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const TodolistReducer = (state: TodoListsType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return [...state.filter((tl) => tl.id !== action.payload.id)]
        }

        default:
            return state
    }

const removeTodolistAC = (id: string, action: RemoveTodolistActionType) => {
        return {
            type: 'REMOVE_TODOLIST',
            payload: {
                id: id,
            }
        }

    }

};
