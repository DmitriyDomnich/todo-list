import { TodoItemStatus } from './TodoItemStatus';

export interface TodoItemModel {
  id: string;
  title: string;
  description?: string;
  status: TodoItemStatus;
  creationDate: Date;
  updateDate?: Date;
}

export type TodoItemKeys = keyof TodoItemModel | '';
export type TodoItemsSort = {
  sortField: TodoItemKeys;
  isAsc: boolean;
};
