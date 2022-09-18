import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoSettings from './components/TodoSettings';
import type { TodoItemsSort } from './models/TodoItem';
import { TodoItemStatus } from './models/TodoItemStatus';

function App() {
  const [filter, setFilter] = useState<TodoItemStatus | ''>('');
  const [todoSortOptions, setTodoSortOptions] = useState<TodoItemsSort>({
    isAsc: false,
    sortField: '',
  });

  return (
    <div className='min-h-[100vh] p-5 bg-slate-200 flex items-center justify-center'>
      <div className='w-full lg:w-3/4 max-h-[955px] flex flex-col'>
        <TodoSettings
          filter={filter}
          todoSortOptions={todoSortOptions}
          setFilter={setFilter}
          setSortOptions={setTodoSortOptions}
        />
        <TodoList filterStatus={filter} todoSortOptions={todoSortOptions} />
      </div>
    </div>
  );
}

export default App;
