import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
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
    filter: FilterValuesType
    changeTodoListFilter: (todolistID: string, filter: FilterValuesType) => void
    removeTodoList: (todolistID: string) => void
    changeTodoListTitle: (todolistID: string, title: string) => void
}

export const Todolist = React.memo( function (props: PropsType) {
    const {
        todolistID,
        title,
        filter,
        removeTodoList,
        changeTodoListFilter,
        changeTodoListTitle
    } = props;

    const tasks = useSelector<RootState, TaskType[]>((state): TaskType[] => state.tasks[todolistID])

    const dispatch = useDispatch();

    const addTask = useCallback((title: string) => dispatch(addTaskAC(todolistID, title)), [])

    const onAllClickHandler = useCallback( () => changeTodoListFilter(todolistID, "all"), []);
    const onActiveClickHandler = useCallback( () => changeTodoListFilter(todolistID, "active"), []);
    const onCompletedClickHandler = useCallback( () => changeTodoListFilter(todolistID, "completed"), []);
    const removeTodolistHandler = useCallback( () => removeTodoList(todolistID), []);
    const changeTodoListTitleCallBack = useCallback( (title: string) => changeTodoListTitle(todolistID, title), []);

    const tasksForTodolist = filter === "active"
        ? tasks.filter(t => !t.isDone)
        : filter === "completed"
            ? tasks.filter(t => t.isDone)
            : tasks

    const mappedTasks: Array<JSX.Element> = tasksForTodolist.map(t => {

        const onClickHandler = () => dispatch(removeTaskAC(todolistID, t.id))
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(todolistID, t.id, newIsDoneValue))
        }
        const changeTaskTitleCallBack = (title: string) => dispatch(changeTaskTitleAC(todolistID, t.id, title))

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox defaultChecked
                // type="checkbox"
                      onChange={onChangeHandler}
                      checked={t.isDone}/>
            <EditableSpan title={t.title} changeTitle={changeTaskTitleCallBack}/>
            <CloseIcon onClick={onClickHandler}>x</CloseIcon>
        </li>
    })

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitleCallBack}/>
                <Button style={{marginLeft: '8px'}} variant="outlined" onClick={removeTodolistHandler}>{<DeleteIcon
                    fontSize={'small'}/>}</Button>
            </h3>

            <AddItemForm addItem={addTask}/>
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
})

