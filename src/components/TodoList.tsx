import React, { useCallback, useMemo, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { initList } from '../constants/initList';
import type { TodoItemModel, TodoItemsSort } from '../models/TodoItem';
import TodoItem from './TodoItem';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TodoDialog from './TodoDialog';
import { TodoItemStatus } from '../models/TodoItemStatus';

type Props = {
  filterStatus: TodoItemStatus | '';
  todoSortOptions: TodoItemsSort;
};

const TodoList = ({ filterStatus, todoSortOptions }: Props) => {
  const [todos, setTodos] = useState<TodoItemModel[]>(
    JSON.parse(localStorage.getItem('todos')!)?.length
      ? JSON.parse(localStorage.getItem('todos')!)
      : initList
  );

  const [visible, setVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoItemModel | null>(null);

  const onOpenDialog = useCallback(
    (todo: TodoItemModel | null) => {
      setCurrentTodo(todo || null);
      setVisible(!visible);
    },
    [visible]
  );

  const handleTodoItemRemove = useCallback(
    (id: string) => {
      const newTodos = todos.filter((todo) => todo.id !== id) || [];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    },
    [todos]
  );
  const handleTodoItemEdit = useCallback(
    (updatedInfo: TodoItemModel) => {
      const todosCopy = todos.slice();
      const index = todos.findIndex((todo) => todo.id === updatedInfo.id);
      todosCopy[index] = { ...updatedInfo };
      setTodos(todosCopy);
      localStorage.setItem('todos', JSON.stringify(todosCopy));
    },
    [todos]
  );
  const handleTodoItemAdd = useCallback(
    (newTodo: TodoItemModel) => {
      const newTodos = todos.concat(newTodo);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    },
    [todos]
  );

  const resultTodos = useMemo(() => {
    const filteredTodos = filterStatus
      ? todos.filter((todo) => todo.status === filterStatus)
      : todos;
    const sorted = todoSortOptions.sortField
      ? todoSortOptions.isAsc
        ? filteredTodos.sort((a, b) =>
            a[todoSortOptions.sortField as keyof TodoItemModel]! <
            b[todoSortOptions.sortField as keyof TodoItemModel]!
              ? -1
              : 1
          )
        : filteredTodos.sort((a, b) =>
            a[todoSortOptions.sortField as keyof TodoItemModel]! >
            b[todoSortOptions.sortField as keyof TodoItemModel]!
              ? -1
              : 1
          )
      : filteredTodos;
    return sorted;
  }, [todos, filterStatus, todoSortOptions]);

  return (
    <div
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
      }}
      className='bg-slate-400  overflow-y-auto rounded-xl grid gap-3 shadow-lg p-5'
    >
      {visible && (
        <TodoDialog
          visible={visible}
          setVisible={setVisible}
          todo={currentTodo}
          onSubmit={currentTodo ? handleTodoItemEdit : handleTodoItemAdd}
        />
      )}
      <Card
        style={{ transition: 'all 150ms ease-out' }}
        onClick={onOpenDialog.bind(null, null)}
        className='h-64 cursor-pointer hover:bg-slate-200 hover:shadow-lg '
      >
        <CardContent className='h-full flex items-center justify-center flex-col'>
          <AddBoxIcon fontSize='large' />
          <span className='text-2xl opacity-50'>Create a new todo</span>
        </CardContent>
      </Card>
      {resultTodos.map((todo: TodoItemModel) => (
        <TodoItem
          onTodoItemRemove={handleTodoItemRemove}
          onTodoItemEdit={onOpenDialog}
          onTodoItemStatusChange={handleTodoItemEdit}
          todo={todo}
          key={todo.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
