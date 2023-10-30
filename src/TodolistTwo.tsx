import React, {useRef} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => any
}

export const Todolist=(props: PropsType)=> {

    const taskTitleInput = useRef<HTMLInputElement>(null)


    const tasksList: Array<JSX.Element>= props.tasks.map((t: TaskType) => {
        const onClickRemoveTaskHandler = () => {props.removeTasks(t.id)}
        return(
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickRemoveTaskHandler}>X</button>
            </li>
        )
    })
    const onClickRemoveTaskHandler = () => props.changeFilter('all')
    const addTaskHandler = () => {
        if(taskTitleInput.current){
            const newTaskTitle = taskTitleInput.current.value
            props.addTask(newTaskTitle)
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input ref={taskTitleInput}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {tasksList}
        </ul>
        <div>
            <button data-btnName={'all'} onClick={onClickRemoveTaskHandler}>All</button>
            {/*<button onClick={()=>props.changeFilter("all")}>All</button>*/}
            <button onClick={()=>props.changeFilter("active")}>Active</button>
            <button onClick={()=>props.changeFilter("completed")}>Completed</button>
        </div>
    </div>
}
