import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan({title, changeTitle}: EditableSpanPropsType) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    function onEditMode() {
        setIsEditMode(true)
    }
    function offEditMode() {
        setIsEditMode(false)
        changeTitle(newTitle)
    }


    return (
       isEditMode
       ? <input
            value={newTitle}
            onChange={onChangeHandler}
            autoFocus
            onBlur={offEditMode}
       />
       : <span onDoubleClick={onEditMode}>{title}</span>
    )
}