import { TodoItemStatus } from '../models/TodoItemStatus';

const statusColors: Record<TodoItemStatus, SelectColor> = {
  Open: 'secondary',
  Done: 'success',
  InProgress: 'primary',
};
type SelectColor =
  | 'secondary'
  | 'success'
  | 'primary'
  | 'error'
  | 'info'
  | 'warning'
  | undefined;
export const getColorByStatus = (status: TodoItemStatus): SelectColor =>
  statusColors[status];
