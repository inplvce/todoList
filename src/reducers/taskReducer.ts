import {TaskType} from "../Todolist";

export const taskReducer = (state: TaskType[], action: TaskReducer): TaskType[] => {
    switch (action.type) {
        case "REMOVE-TASK": {
         const stateCopy = state

        }
        // case "ADD_TASK": {
        //     return state
        // }

        default:
            return state
    }
}

type TaskReducer = RemoveTaskACType | AddTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id}
    } as const
}

export const addTaskAC = (id: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {id, title}
    } as const
}


