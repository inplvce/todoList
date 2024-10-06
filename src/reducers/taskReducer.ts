import {TaskType} from "../Todolist";

export const taskReducer = (state: TaskType[], action: TaskReducer): TaskType[] => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return state
        }
        default:
            return state
    }
}

type TaskReducer = RemoveTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id}
    } as const
}