import { TodoItemModel } from '../models/TodoItem';
import { v4 as createId } from 'uuid';

export const initList: TodoItemModel[] = [
  {
    creationDate: new Date(1663341869499),
    id: createId(),
    status: 'Open',
    title: 'Feed dog',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus cumque at, iusto eveniet expedita saepe voluptas cum eligendi beatae! Rem earum velit a esse non quae accusantium dolorum sunt atque.',
  },
  {
    creationDate: new Date(1663341861499),
    id: createId(),
    status: 'Open',
    title: 'Go for a walk',
    description: 'Need some fresh air',
  },
  {
    creationDate: new Date(1663341869999),
    id: createId(),
    status: 'InProgress',
    title: 'Do react task',
    description: "It's fun",
  },
  {
    creationDate: new Date(1663341269499),
    id: createId(),
    status: 'Open',
    title: 'Get 2650+ mmr',
    description: 'To increase ego',
  },
  {
    creationDate: new Date(1663341829499),
    id: createId(),
    status: 'Done',
    title: 'Update playlist',
  },
  {
    creationDate: new Date(1663340869499),
    id: createId(),
    status: 'Done',
    title: 'Help Maxym',
    description: 'He needs to finish his pet project',
  },
];
