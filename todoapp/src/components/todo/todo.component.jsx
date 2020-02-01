import React from 'react';
import './todo.styles.scss';

const Todo = ({todo, createTime}) =>(
    <div className="Todo">
        <h2 className="todo-name">{todo}</h2>
        <p className="todo-time">{createTime}</p>
    </div>
)

export default Todo;