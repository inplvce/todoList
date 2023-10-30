import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: string
    removeTasks: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}


export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(true)


    const taskTitleInput = useRef<HTMLInputElement>(null)


    const tasksList: Array<JSX.Element> | JSX.Element = props.tasks.length ?
        props.tasks.map((t: TaskType) => {
            const onClickRemoveTaskHandler = () => {
                props.removeTasks(t.id)
            }
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
            return (
                <li key={t.id} className={t.isDone ? "task-is-done" : "task"}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}
                    />
                    <span>{t.title}</span>
                    <button
                        onClick={onClickRemoveTaskHandler}>X
                    </button>
                    {/*{title.length > 15 && <p style={}>Your title is too long!</p>}*/}
                </li>
            )
        })
        : <span>
            Your tasks list is empty
        </span>
    const onClickRemoveTaskHandler = () => props.changeFilter('all')

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(title)
        } else {
            setError(true)
        }
        // props.addTask(title)
        setTitle('')


    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        if (e.target.value.trimStart() || (e.target.value === "")) {
            setTitle(e.target.value)
        } else {
            setError(true)
        }
        // setTitle(e.target.value.trimStart())
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isAddTaskBtnDisabled && addTaskHandler()

    // const userMessageStartTyping: boolean | JSX.Element =
    //     title.length === 0 && <p>Please, start typing...</p>
    const userMessageLengthTitle: boolean | JSX.Element =
        title.length > 15 && <p style={{color: "red"}}>Your title is too long!</p>

    const isAddTaskBtnDisabled = title.length > 15 || title.length === 0
    const allBtnClass: string | undefined = `bnt-filter${props.filter === "all" && "-active"}`
    const userMessageEmptyError = error && <p style={{color: "red"}}>Enter task title!!!</p>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    placeholder={"Please, start typing..."}
                    className={error ? "input-error" : undefined}


                />
                <button
                    disabled={isAddTaskBtnDisabled}
                    onClick={addTaskHandler}>

                    +
                </button>
                {/*{userMessageStartTyping}*/}
                {userMessageLengthTitle}
                {userMessageEmptyError}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button data-btnName={'all'}
                        className={props.filter === "all" ? "btn-filter-active" : undefined}
                        onClick={onClickRemoveTaskHandler}>All
                </button>
                {/*<button onClick={()=>props.changeFilter("all")}>All</button>*/}
                <button
                    className={props.filter === "active" ? "btn-filter-active" : undefined}
                    onClick={() => props.changeFilter("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-filter-active" : undefined}
                    onClick={() => props.changeFilter("completed")}>Completed
                </button>
            </div>
        </div>
    )
}
