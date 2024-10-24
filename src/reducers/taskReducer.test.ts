import {addTaskAC, changeTaskTitleAC, removeTaskAC, taskReducer} from './taskReducer'
import {TaskStateType} from "../App";


test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    const endState = taskReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    })
})



    test('add task', () => {
        const startState = {
            todolistId1: [
                {id: '1', title: 'CSS', isDone: false},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false},
            ],
            todolistId2: [
                {id: '1', title: 'bread', isDone: false},
                {id: '2', title: 'milk', isDone: true},
                {id: '3', title: 'tea', isDone: false},
            ]
        }

        const endState = taskReducer(startState, addTaskAC('todolistId1', 'New Task'))

        expect(endState.todolistId1.length).toBe(4);
        expect(endState.todolistId1[3].title).toBe('New Task');
        expect(endState.todolistId1[3].isDone).toBe(false);
    })

test('change task title', () => {
    const startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    }

    const endState = taskReducer(startState, changeTaskTitleAC('todolistId1', '1', 'New Task'))

    expect(endState.todolistId1[0].title).toBe('New Task');
})