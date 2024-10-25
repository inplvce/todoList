import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {TaskStateType} from "../App";

export const taskReducer = (state: TaskStateType, action: TaskReducer): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter((t) => t.id !== action.id)
            }
        }
        case "ADD-TASK": {
            const task = {id: v1(), title: action.title, isDone: false}
            const copyState = {...state,
                [action.todolistID]: [...state[action.todolistID], task]
            }
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t =>
                    t.id === action.id ? { ...t, title: action.title } : t
                )
            };
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map((t) => t.id === action.id ? {
                     ...t, isDone: action.isDone
                }: t)
            }
        }


        default:
            return state
    }
}

type TaskReducer = RemoveTaskACType | AddTaskACType | ChangeTaskTitleACType | ChangeTaskStatusACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const removeTaskAC = (todolistID: string, id: string) => {
    return {type: 'REMOVE-TASK', todolistID, id} as const
}
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK', todolistID, title
    } as const
}
export const changeTaskTitleAC = (todolistID: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE', todolistID, id, title
    } as const
}
export const changeTaskStatusAC = (todolistID: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS', todolistID, id, isDone
    }as const
}


