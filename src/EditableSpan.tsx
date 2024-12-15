import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo(({title, changeTitle}: EditableSpanPropsType) => {
    console.log('EditableSpan is called')
    const [isEditMode, setIsEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const onChangeHandler = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }, [])
    const onEditMode = React.useCallback( () => {
        setIsEditMode(true)
    }, [])
    const offEditMode =  React.useCallback( () => {
        setIsEditMode(false)
        changeTitle(newTitle)
    }, [newTitle, changeTitle])


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
})