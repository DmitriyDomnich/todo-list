import React, { useCallback } from 'react';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { TodoItemModel } from '../models/TodoItem';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { TodoItemStatus } from '../models/TodoItemStatus';
import { toTodoString } from '../utils/dates';
import { getColorByStatus } from '../utils/todos';
import { Tooltip } from '@mui/material';

type Props = {
  todo: TodoItemModel;
  onTodoItemRemove: (id: string) => void;
  onTodoItemEdit: (todo: TodoItemModel) => void;
  onTodoItemStatusChange: (todo: TodoItemModel) => void;
};

const TodoItem = ({
  todo,
  onTodoItemEdit,
  onTodoItemRemove,
  onTodoItemStatusChange,
}: Props) => {
  const handleTodoItemRemove = useCallback(() => {
    onTodoItemRemove(todo.id);
  }, [todo, onTodoItemRemove]);
  const handleTodoItemEdit = useCallback(() => {
    onTodoItemEdit(todo);
  }, [todo, onTodoItemEdit]);
  const handleTodoItemStatusChange = useCallback(
    (ev: SelectChangeEvent<TodoItemStatus>) => {
      const newTodo: TodoItemModel = {
        ...todo,
        updateDate: new Date(),
        status: ev.target.value as TodoItemStatus,
      };
      onTodoItemStatusChange(newTodo);
    },
    [todo, onTodoItemStatusChange]
  );

  return (
    <Card className='h-64'>
      <CardContent className='h-52'>
        <div className='text-center text-xs -mt-4 text-indigo-300'>
          {toTodoString(todo.updateDate || todo.creationDate)}
        </div>
        <Tooltip enterDelay={500} title={todo.title}>
          <h3 className='text-xl font-bold mb-2 border-b-4 border-indigo-500 truncate'>
            {todo.title}
          </h3>
        </Tooltip>
        <FormControl size='small' fullWidth className='my-4' margin='dense'>
          <InputLabel id='status-select'>Status</InputLabel>
          <Select
            color={getColorByStatus(todo.status)}
            label='Status'
            value={todo.status}
            onChange={handleTodoItemStatusChange}
            labelId='status-select'
          >
            <MenuItem value='Open'>Open</MenuItem>
            <MenuItem value='InProgress'>In Progress</MenuItem>
            <MenuItem value='Done'>Done</MenuItem>
          </Select>
        </FormControl>
        <Tooltip enterDelay={500} title={todo?.description || ''}>
          <div className='opacity-80 line-clamp-4'>{todo.description}</div>
        </Tooltip>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleTodoItemRemove}
          size='small'
          variant='contained'
          color='error'
        >
          Remove
        </Button>
        <Button
          onClick={handleTodoItemEdit}
          size='small'
          variant='contained'
          color='warning'
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoItem;
