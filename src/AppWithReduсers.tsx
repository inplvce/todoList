import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    AppBar,
    Container,
    createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper, Switch,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu, Swipe} from "@mui/icons-material";
import {pink} from "@mui/material/colors";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistReducer
} from "./reducers/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./reducers/taskReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type TaskStateType = { [key: string]: Array<TaskType> }

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, dispatchForTodolists] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [darkMode, setDarkMode] = useState(false)

    const [tasks, dispatchForTasks] = useReducer(taskReducer, {
        [todolistID1]: [
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'tea', isDone: false},
        ]
    });

    // CRUD tasks
    function removeTask(todolistID: string, taskID: string) {
        dispatchForTasks(removeTaskAC(todolistID, taskID))
    }

    function addTask(todolistID: string, title: string) {
        dispatchForTasks(addTaskAC(todolistID, title))
    }

    function changeTaskStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatchForTasks(changeTaskStatusAC(todolistID, taskId, isDone))
    }

    function changeTaskTitle(todolistID: string, taskId: string, title: string) {
        dispatchForTasks(changeTaskTitleAC(todolistID, taskId, title))
    }

    // CRUD todoLists
    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchForTasks(action)
        dispatchForTodolists(action)
    }

    function changeTodoListFilter(todolistID: string, filter: FilterValuesType) {
        dispatchForTodolists(changeTodolistFilterAC(todolistID, filter))
    }

    function changeTodoListTitle(todolistID: string, title: string) {
        dispatchForTodolists(changeTodolistTitleAC(todolistID, title))
    }

    function removeTodoList(id: string) {
        const action = removeTodolistAC(id)
        dispatchForTasks(action)
        dispatchForTodolists(action)
    }

    const theme = createTheme({
        palette: {
            primary: pink,
            mode: darkMode ? 'dark' : 'light'
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>
                        </Typography>
                        <Switch
                            color={"primary"}
                            onChange={(e) => setDarkMode(e.currentTarget.checked)}
                        />
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map(el => {
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={el.id}
                                        todolistID={el.id}
                                        title={el.title}
                                        tasks={tasks[el.id] || []}
                                        removeTask={removeTask}
                                        changeTodoListFilter={changeTodoListFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })}
                    </Grid>

                </Container>

            </div>
        </ThemeProvider>
    );
}

export default App;
