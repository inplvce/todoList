import React from 'react';
import {v1} from "uuid";

export const TodolistReducer = (state: any, action: any) => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const initialState = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
};
