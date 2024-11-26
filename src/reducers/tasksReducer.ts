import {v1} from "uuid";
import {TaskStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolistsReducer";


const initialState: TaskStateType =  {}

export const tasksReducer = (state: TaskStateType = initialState, action: TaskReducer): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter((t) => t.id !== action.id)
            }
        }
        case "ADD_TASK": {
            const task = {id: v1(), title: action.title, isDone: false}
            const copyState = {...state,
                [action.todolistID]: [...state[action.todolistID], task]
            }
            return copyState
        }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t =>
                    t.id === action.id ? { ...t, title: action.title } : t
                )
            };
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map((t) => t.id === action.id ? {
                     ...t, isDone: action.isDone
                }: t)
            }
        }
        case "ADD_TODOLIST": {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case "REMOVE_TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        default:
    return state;
    }
}

type TaskReducer = RemoveTaskACType | AddTaskACType | ChangeTaskTitleACType | ChangeTaskStatusACType | AddTodolistActionType | RemoveTodolistActionType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const removeTaskAC = (todolistID: string, id: string) => {
    return {type: 'REMOVE_TASK', todolistID, id} as const
}
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD_TASK', todolistID, title
    } as const
}
export const changeTaskTitleAC = (todolistID: string, id: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE', todolistID, id, title
    } as const
}
export const changeTaskStatusAC = (todolistID: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS', todolistID, id, isDone
    }as const
}


