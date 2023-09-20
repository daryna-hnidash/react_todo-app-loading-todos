import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { getTodos } from '../../api/todos';
import { Error } from '../Error';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import { Filter } from '../../types/filter';
import { TodosContext } from '../../TodosContext';
import { ErrorMessage } from '../../types/errorMessage';

type Props = {
  userID: number;
};

export const TodoApp: React.FC<Props> = ({ userID }) => {
  const {
    todos, setTodos, errorMessage, setErrorMessage,
  } = useContext(TodosContext);
  const [filter, setFilter] = useState(Filter.ALL);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filter.ACTIVE:
        return todos.filter(todo => todo.completed === false);

      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  }, [todos, filter]);

  useEffect(() => {
    getTodos(userID)
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.DOWNLOAD))
      .finally(() => setInterval(() => setErrorMessage(ErrorMessage.NO), 3000));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main todos={visibleTodos} />

        {todos.length > 0 && (
          <Footer filter={filter} setFilter={setFilter} todos={todos} />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage !== ErrorMessage.NO && (
        <Error />
      ) }
    </div>
  );
};