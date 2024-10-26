import {v1} from "uuid";
import {TodolistsType} from "../App";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolistReducer";

const todolistID1 = v1();
const todolistID2 = v1();

const initialState: TodolistsType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

test('remove todo', () => {
    const endState = todolistReducer(initialState, removeTodolistAC(todolistID2));
    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to learn')
})

test('add todo', () => {
    const endState = todolistReducer(initialState, addTodolistAC('new todo'));
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('new todo')
})

test('change title todo', () => {
    const endState = todolistReducer(initialState, changeTodolistTitleAC(todolistID1, 'new name'));
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('new name');
})

test('change filter todo', () => {
    const endState = todolistReducer(initialState, changeTodolistFilterAC(todolistID1, 'active'))
    expect(endState[0].filter).toBe('active');
})
;
