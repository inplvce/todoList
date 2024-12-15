import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch} from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import {EditableSpan} from './EditableSpan';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasksReducer";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TaskPropsType = {
    task: TaskType;
    todolistID: string;
};

export const Task = React.memo(({task, todolistID}: TaskPropsType) => {
    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(removeTaskAC(todolistID, task.id));
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todolistID, task.id, newIsDoneValue));
    };
    const changeTaskTitleCallBack = useCallback(
        (title: string) => {
            console.log('Dispatching action:', todolistID, task.id, title);
            dispatch(changeTaskTitleAC(todolistID, task.id, title));
        },
        [dispatch, todolistID, task.id]
    );

    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                onChange={onChangeHandler}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitleCallBack} />
            <CloseIcon onClick={onClickHandler}>x</CloseIcon>
        </li>
    );
});