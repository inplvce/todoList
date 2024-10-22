import {TaskType} from "../Todolist";

export const taskReducer = (state: TaskType[], action: TaskReducer): TaskType[] => {
    switch (action.type) {
        // case "REMOVE-TASK": {
        //  const stateCopy = {state};
        //  stateCopy.filter((t: TaskType) => t.id === action.payload.id);

        // }
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

export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistID, id}
    } as const
}

export const addTaskAC = (id: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {id, title}
    } as const
}


