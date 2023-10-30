import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';


export type FilterValuesType = "all" | "active" | "completed"

function App() {
// global
    const todoListTitle = "What to learn"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true},
        {id: crypto.randomUUID(), title: "JS", isDone: true},
        {id: crypto.randomUUID(), title: "ReactJS", isDone: false},
        {id: crypto.randomUUID(), title: "Redux", isDone: false}
    ])

    const removeTasks = (taskId: string) => {

        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }
    const addTask = (title: string) => {
//1 create task
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title: title,
            isDone: false
        }
        //add
        const nextState: Array<TaskType> = [...tasks, newTask]
        setTasks(nextState)
    }

    function changeTaskStatus(id: string, isDone: boolean) {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }

// local
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>("active") // tut
    const changeFilter = (newFilterValue: FilterValuesType) => setFilter(newFilterValue)
    // const removeTasks = (taskId: number) => {
    //
    //     const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
    //     setTasks(nextState)
    // }

    const getFilteredTasks = (allTasks: Array<TaskType>, newFilterValue: FilterValuesType): Array<TaskType> => {
        switch (newFilterValue) {
            case "active":
                return allTasks.filter(t => t.isDone === false)
            case "completed":
                return allTasks.filter(t => t.isDone === true)
            default:
                return allTasks;
        }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <Todolist addTask={addTask}
                      title="What to learn"
                      tasks={filteredTasks}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />

        </div>
    );
}

export default App;
