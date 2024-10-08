import {v1} from "uuid";
import {TodoListsType} from "../App";
import {addTodolistAC, removeTodolistAC, todolistReducer} from "./todolistReducer";
import {removeTaskAC} from "./taskReducer";

const todolistID1 = v1();
const todolistID2 = v1();

const initialState: TodoListsType[] = [
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

;
