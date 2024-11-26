import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
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
import {Menu} from "@mui/icons-material";
import {pink} from "@mui/material/colors";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
} from "./reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./reducers/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type TaskStateType = { [key: string]: Array<TaskType> }

function AppWithRedux() {


    const [darkMode, setDarkMode] = useState(false)

    const dispatch = useDispatch();
    const todolists = useSelector<RootState, Array<TodolistsType>>(state => state.todolists)

    // CRUD tasks задиспатчили в тудулистах

    // CRUD todoLists
    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    function changeTodoListFilter(todolistID: string, filter: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }

    function changeTodoListTitle(todolistID: string, title: string) {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }

    function removeTodoList(id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)
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
                                        changeTodoListFilter={changeTodoListFilter}
                                        filter={el.filter}
                                        removeTodoList={removeTodoList}
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

export default AppWithRedux;
