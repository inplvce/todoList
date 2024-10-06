import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export function AddItemForm({addItem}: AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTaskHandler();
        }
    }

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    return (
        <div>
            <TextField size={'small'} id="outlined-basic" label="" variant="outlined"
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? "error" : ""}
                       value={title}
            />
            <AddIcon fontSize={'large'} onClick={addTaskHandler}>+</AddIcon>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}