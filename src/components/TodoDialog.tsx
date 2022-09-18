import React, { useCallback, useState } from 'react';
import { TodoItemModel } from '../models/TodoItem';
import Modal from '@mui/material/Modal';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { TodoItemStatus } from '../models/TodoItemStatus';
import { v4 as createId } from 'uuid';

type Props = {
  visible: boolean;
  setVisible: (isVisible: boolean) => void;
  todo: TodoItemModel | null;
  onSubmit: (todo: TodoItemModel) => void;
};

const TodoDialog = ({ visible, setVisible, todo, onSubmit }: Props) => {
  const handleClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description);
  const [status, setStatus] = useState<TodoItemStatus>(todo?.status || 'Open');

  const handleSubmit = useCallback(() => {
    const now = new Date();
    const newTodo: TodoItemModel = {
      title,
      description,
      status,
      id: todo?.id || createId(),
      creationDate: todo?.creationDate || now,
    };
    if (todo?.creationDate !== now) {
      newTodo.updateDate = new Date();
    }
    onSubmit(newTodo);
    setVisible(false);
  }, [title, description, status, onSubmit, todo, setVisible]);

  const handleChangeTitle = useCallback((ev: any) => {
    setTitle((ev.target as HTMLInputElement).value);
  }, []);
  const handleChangeDescription = useCallback((ev: any) => {
    setDescription((ev.target as HTMLInputElement).value);
  }, []);
  const handleChangeStatus = useCallback(
    (ev: SelectChangeEvent<TodoItemStatus>) => {
      setStatus(ev.target.value as TodoItemStatus);
    },
    []
  );

  return (
    <Modal
      open={visible}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <form
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-emerald-200 rounded-md shadow-md p-4'
        onSubmit={handleSubmit}
      >
        <TextField
          required
          fullWidth
          value={title}
          onChange={handleChangeTitle}
          label='Title'
          variant='outlined'
        />
        <TextField
          fullWidth
          className='my-3 block'
          maxRows={5}
          margin='dense'
          value={description}
          onChange={handleChangeDescription}
          multiline
          label='Description'
          variant='outlined'
        />
        <FormControl fullWidth className='my-4' margin='dense'>
          <InputLabel id='status-select'>Status</InputLabel>
          <Select
            label='Status'
            value={status}
            onChange={handleChangeStatus}
            labelId='status-select'
          >
            <MenuItem value='Open'>Open</MenuItem>
            <MenuItem value='InProgress'>In Progress</MenuItem>
            <MenuItem value='Done'>Done</MenuItem>
          </Select>
        </FormControl>
        <div className='my-2'>
          <Button type='submit' variant='contained' color='primary'>
            {todo ? 'Edit' : 'Create'}
          </Button>
          <Button
            onClick={handleClose}
            sx={{ marginLeft: 1 }}
            variant='outlined'
            color='error'
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoDialog;
