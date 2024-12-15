import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './common/components/AddItemForm';
import {EditableSpan} from './common/components/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC} from "./reducers/tasksReducer";
import {RootState} from "./reducers/store";
import {Task} from "./Task";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type PropsType = {
    todolistID: string;
    title: string;
    filter: FilterValuesType;
    changeTodoListFilter: (todolistID: string, filter: FilterValuesType) => void;
    removeTodoList: (todolistID: string) => void;
    changeTodoListTitle: (todolistID: string, title: string) => void;
};

type TaskPropsType = {
    task: TaskType;
    todolistID: string;
};

export const Todolist = React.memo((props: PropsType) => {
    const {
        todolistID,
        title,
        filter,
        removeTodoList,
        changeTodoListFilter,
        changeTodoListTitle
    } = props;

    const tasks = useSelector<RootState, TaskType[]>(state => state.tasks[todolistID]);

    const dispatch = useDispatch();

    const addTask = useCallback((title: string) => dispatch(addTaskAC(todolistID, title)), [dispatch, todolistID]);
    const removeTodolistHandler = useCallback(() => removeTodoList(todolistID), [removeTodoList, todolistID]);
    const changeTodoListTitleCallBack = useCallback(
        (title: string) => changeTodoListTitle(todolistID, title),
        [todolistID]
    );

    const onAllClickHandler = useCallback(() => changeTodoListFilter(todolistID, "all"), [changeTodoListFilter, todolistID]);
    const onActiveClickHandler = useCallback(() => changeTodoListFilter(todolistID, "active"), [changeTodoListFilter, todolistID]);
    const onCompletedClickHandler = useCallback(() => changeTodoListFilter(todolistID, "completed"), [changeTodoListFilter, todolistID]);

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitleCallBack} />
                <Button style={{marginLeft: '8px'}} variant="outlined" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="small" />
                </Button>
            </h3>

            <AddItemForm addItem={addTask} />
            <ul>
                {tasksForTodolist.map(t => (
                    <Task key={t.id} task={t} todolistID={todolistID}  />
                ))}
            </ul>
            <div>
                <Button
                    variant={filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});