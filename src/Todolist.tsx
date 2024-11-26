import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasksReducer";
import {RootState} from "./reducers/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todolistID: string
    title: string
    // tasks: Array<TaskType>
    filter: FilterValuesType

    // removeTask: (todolistID: string, taskId: string) => void
    // addTask: (todolistID: string, taskTitle: string) => void
    // changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    // changeTaskTitle: (todolistID: string, taskId: string, title: string) => void

    changeTodoListFilter: (todolistID: string, filter: FilterValuesType) => void
    removeTodoList: (todolistID: string) => void
    changeTodoListTitle:(todolistID: string, title: string) => void
}

export function Todolist(
    {
        todolistID,
        title,
        filter,
        removeTodoList,
        changeTodoListFilter,
        changeTodoListTitle
    }: PropsType)

{

    const tasks = useSelector<RootState, TaskType[]>((state): TaskType[] => state.tasks[todolistID])

    const dispatch = useDispatch();

    const addTaskHandler = (title: string) => dispatch(addTaskAC(todolistID, title))

    const onAllClickHandler = () => changeTodoListFilter(todolistID, "all");
    const onActiveClickHandler = () => changeTodoListFilter(todolistID, "active");
    const onCompletedClickHandler = () => changeTodoListFilter(todolistID, "completed");
    const removeTodolistHandler = () => removeTodoList(todolistID)
    const changeTodoListTitleCallBack = (title: string) => changeTodoListTitle(todolistID, title)

    const tasksForTodolist = filter === "active"
        ? tasks.filter(t => t.isDone === false)
        : filter === "completed"
            ? tasks.filter(t => t.isDone === true)
            : tasks

    const mappedTasks: Array<JSX.Element> = tasksForTodolist.map(t => {
// const onChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
//     event.currentTarget.value
// }

        const onClickHandler = () =>  dispatch(removeTaskAC(todolistID, t.id))
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(todolistID, t.id, newIsDoneValue))
        }
        const changeTaskTitleCallBack = (title: string) => dispatch(changeTaskTitleAC(todolistID, t.id, title))

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox defaultChecked
                      // type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone} />
            <EditableSpan title={t.title} changeTitle={changeTaskTitleCallBack}/>
            <CloseIcon onClick={onClickHandler}>x</CloseIcon>
        </li>
    })

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitleCallBack}  />
                <Button style={{marginLeft: '8px'}}variant="outlined" onClick={removeTodolistHandler}>{<DeleteIcon fontSize={'small'} />}</Button>

            </h3>
            <AddItemForm addItem={addTaskHandler} />
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <Button variant={filter === 'all' ? "contained" : "text"}
                    // className={filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button variant={filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>)
}
