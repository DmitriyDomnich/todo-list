import React, { useCallback } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { TodoItemStatus } from '../models/TodoItemStatus';
import type { TodoItemKeys, TodoItemsSort } from '../models/TodoItem';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Checkbox from '@mui/material/Checkbox';

type Props = {
  setFilter: (filterTerm: TodoItemStatus | '') => void;
  setSortOptions: (sortField: TodoItemsSort) => void;
  filter: TodoItemStatus | '';
  todoSortOptions: TodoItemsSort;
};

const TodoSettings = ({
  filter,
  setFilter,
  todoSortOptions,
  setSortOptions,
}: Props) => {
  const handleFilterChange = useCallback(
    ({ target }: SelectChangeEvent<TodoItemStatus>) => {
      setFilter(target!.value as TodoItemStatus);
    },
    [setFilter]
  );
  const handleSortChange = useCallback(
    ({ target }: SelectChangeEvent<TodoItemKeys>) => {
      const selectedValue = target.value as TodoItemKeys;
      console.log(selectedValue);

      setSortOptions({
        isAsc:
          todoSortOptions?.sortField === selectedValue
            ? !todoSortOptions.isAsc
            : true,
        sortField: target.value as TodoItemKeys,
      });
    },
    [setSortOptions, todoSortOptions]
  );
  const handleSortWayChange = useCallback(() => {
    setSortOptions({
      ...todoSortOptions,
      isAsc: !todoSortOptions.isAsc,
    });
  }, [todoSortOptions, setSortOptions]);

  return (
    <div className='self-end flex mb-2'>
      <FormControl className='w-36'>
        <InputLabel id='sort-label'>Sort</InputLabel>
        <Select
          labelId='sort-label'
          value={todoSortOptions.sortField}
          label='Sort'
          onChange={handleSortChange}
        >
          <MenuItem className='relative' value=''>
            No sort
          </MenuItem>
          <MenuItem
            onClick={handleSortWayChange}
            className='relative'
            value='title'
            sx={{
              padding: 2,
            }}
          >
            <span>Title</span>
            {todoSortOptions.sortField === 'title' && (
              <span className='absolute right-5 top-2'>
                <Checkbox
                  checked={todoSortOptions.isAsc}
                  icon={
                    <ArrowUpwardIcon
                      sx={{
                        height: 20,
                        width: 20,
                        transform: 'rotate(180deg)',
                      }}
                    />
                  }
                  disableRipple
                  checkedIcon={
                    <ArrowUpwardIcon
                      sx={{
                        height: 20,
                        width: 20,
                      }}
                    />
                  }
                />
              </span>
            )}
          </MenuItem>
          <MenuItem
            onClick={handleSortWayChange}
            className='relative'
            value='creationDate'
            sx={{
              padding: 2,
            }}
          >
            <span>Date</span>
            {todoSortOptions.sortField === 'creationDate' && (
              <span className='absolute right-5 top-2'>
                <Checkbox
                  checked={todoSortOptions.isAsc}
                  icon={
                    <ArrowUpwardIcon
                      sx={{
                        height: 20,
                        width: 20,
                        transform: 'rotate(180deg)',
                      }}
                    />
                  }
                  disableRipple
                  checkedIcon={
                    <ArrowUpwardIcon
                      sx={{
                        height: 20,
                        width: 20,
                      }}
                    />
                  }
                />
              </span>
            )}
          </MenuItem>
        </Select>
      </FormControl>
      <div className='ml-2'>
        <FormControl className='w-36'>
          <InputLabel id='filter-label'>Filter</InputLabel>
          <Select
            labelId='filter-label'
            value={filter}
            label='Age'
            onChange={handleFilterChange}
          >
            <MenuItem value=''>No filter</MenuItem>
            <MenuItem value='Open'>Open</MenuItem>
            <MenuItem value='InProgress'>In Progress</MenuItem>
            <MenuItem value='Done'>Done</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default TodoSettings;
