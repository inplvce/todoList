import React, { useCallback, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './common/components/AddItemForm';
import {
    AppBar,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./reducers/todolistsReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType };
export type TaskStateType = { [key: string]: Array<TaskType> };

// Вынесем логику переключения темы в отдельный хук
const useThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);
    const theme = createTheme({
        palette: {
            primary: pink,
            mode: darkMode ? 'dark' : 'light'
        }
    });

    const toggleTheme = () => setDarkMode((prev) => !prev);

    return { theme, toggleTheme, darkMode };
};

function AppWithRedux() {
    const { theme, toggleTheme, darkMode } = useThemeToggle();
    const dispatch = useDispatch();
    const todolists = useSelector<RootState, Array<TodolistsType>>(state => state.todolists);

    // CRUD tasks
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    const changeTodoListFilter = useCallback((todolistID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, filter));
    }, [dispatch]);

    const changeTodoListTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title));
    }, [dispatch]);

    const removeTodoList = useCallback((id: string) => {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6">
                            {darkMode ? 'text2' : 'text1'}
                        </Typography>
                        <Switch
                            color="primary"
                            checked={darkMode}
                            onChange={toggleTheme}
                        />
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{ padding: '20px' }}>
                        <AddItemForm addItem={addTodoList} />
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map(el => (
                            <Grid item key={el.id}>
                                <Paper style={{ padding: '10px' }}>
                                    <Todolist
                                        todolistID={el.id}
                                        title={el.title}
                                        changeTodoListFilter={changeTodoListFilter}
                                        filter={el.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default AppWithRedux;