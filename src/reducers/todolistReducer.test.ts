import {v1} from "uuid";
import {TodoListsType} from "../App";

const todolistID1 = v1();
const todolistID2 = v1();

const initialState: TodoListsType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

test('remove todo', () => {
    expect(initialState.length).toBe(1)
    expect(initialState[0]).toBe(1)
})

;
