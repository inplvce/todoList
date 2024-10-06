import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}



type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType


    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, taskTitle: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void


    changeTodoListFilter: (todolistID: string, filter: FilterValuesType) => void
    removeTodoList: (todolistID: string) => void
    changeTodoListTitle:(todolistID: string, title: string) => void

}

export function Todolist(
    {
        todolistID,
        tasks,
        title,
        filter,
        addTask,
        changeTaskStatus,
        removeTask,
        removeTodoList,
        changeTodoListFilter,
        changeTaskTitle,
        changeTodoListTitle
    }: PropsType) {

    const addTaskHandler = (title: string) => addTask(todolistID, title);
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
        const onClickHandler = () => removeTask(todolistID, t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistID, t.id, e.currentTarget.checked)
        
        const changeTaskTitleCallBack = (title: string) => changeTaskTitle(todolistID, t.id, title)

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
