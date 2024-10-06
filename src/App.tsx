import React, {useState} from 'react';
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

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = { id: string, title: string, filter: FilterValuesType }
export type TaskStateType = { [key: string]: Array<TaskType> }

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [darkMode, setDarkMode]=useState(false)

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Eggs", isDone: false},
            {id: v1(), title: "Apples", isDone: false},
        ]
    });

    // CRUD tasks
    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeTaskStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    function changeTaskTitle(todolistID: string, taskId: string, title: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title} : el)})
    }

    // CRUD todoLists
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListsType = {id: newTodoListID, title, filter: "all"}
        setTodoLists([newTodoList, ...todolists])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListFilter(todolistID: string, filter: FilterValuesType) {
        setTodoLists(todolists.map(el => el.id === todolistID
            ? {...el, filter} : el))
    }

    function changeTodoListTitle(todolistID: string, title: string) {
        setTodoLists(todolists.map(el => el.id === todolistID
            ? {...el, title} : el))
    }

    function removeTodoList(todolistID: string) {
        setTodoLists(todolists.filter(el => el.id !== todolistID))
        const nextState = {...tasks};
        delete nextState[todolistID]
        setTasks(nextState)
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
            <AppBar position ='static'>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                    </Typography>
                    <Switch
                       color={"primary"}
                       onChange={(e)=> setDarkMode(e.currentTarget.checked)}
                    />
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing = {3}>
            {todolists.map(el => {
                return <Grid item>
                    <Paper style={{padding: '10px'}}>
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasks[el.id]}
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
